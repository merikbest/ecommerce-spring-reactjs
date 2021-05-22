package com.gmail.merikbest2015.ecommerce.service.graphql;

import com.gmail.merikbest2015.ecommerce.service.OrderService;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
public class GraphQLProvider {

    private final PerfumeService perfumeService;
    private final OrderService orderService;
    private final UserService userService;

    @Getter
    private GraphQL graphQL;

    @PostConstruct
    public void loadSchema() throws IOException {
        String graphQLSchemaFile = "graphql/schemas.graphql";
        ClassPathResource classPathResource = new ClassPathResource(graphQLSchemaFile);
        InputStream inputStream = classPathResource.getInputStream();
        File fileSchema = File.createTempFile(graphQLSchemaFile, ".temp");

        try {
            FileUtils.copyInputStreamToFile(inputStream, fileSchema);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(inputStream);
        }
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(fileSchema);
        RuntimeWiring wiring = buildRuntimeWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
        graphQL = GraphQL.newGraphQL(schema).build();
    }

    private RuntimeWiring buildRuntimeWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type("Query", typeWiring -> typeWiring
                        .dataFetcher("perfumes", perfumeService.getAllPerfumesByQuery())
                        .dataFetcher("perfumesIds", perfumeService.getAllPerfumesByIdsQuery())
                        .dataFetcher("perfume", perfumeService.getPerfumeByQuery())
                        .dataFetcher("orders", orderService.getAllOrdersByQuery())
                        .dataFetcher("ordersByEmail", orderService.getUserOrdersByEmailQuery())
                        .dataFetcher("users", userService.getAllUsersByQuery())
                        .dataFetcher("user", userService.getUserByQuery()))
                .build();
    }
}

package com.gmail.merikbest2015.ecommerce.service.graphql;

import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class GraphQLPerfumeProvider {

    private final PerfumeService perfumeService;

    @Value("classpath:graphql/perfume.graphql")
    private Resource resource;
    private GraphQL graphQL;

    public GraphQL getGraphQL() {
        return graphQL;
    }

    @PostConstruct
    public void loadSchema() throws IOException {
        File fileSchema = resource.getFile();
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(fileSchema);
        RuntimeWiring wiring = buildRuntimeWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
        graphQL = GraphQL.newGraphQL(schema).build();
    }

    private RuntimeWiring buildRuntimeWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type("Query", typeWiring -> typeWiring
                        .dataFetcher("perfumes", perfumeService.getAllPerfumesByQuery())
                        .dataFetcher("perfume", perfumeService.getPerfumeByQuery()))
                .build();
    }
}

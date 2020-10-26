package com.gmail.merikbest2015.ecommerce.controller;

import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Class with utility methods for controller classes.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 */
public class ControllerUtils {
    /**
     * Returns validation errors to html page.
     *
     * @param bindingResult errors in validating http request.
     * @return validation errors to html page.
     */
    static Map<String, String> getErrors(BindingResult bindingResult) {
        Collector<FieldError, ?, Map<String, String>> collector = Collectors.toMap(
                fieldError -> fieldError.getField() + "Error",
                FieldError::getDefaultMessage
        );
        return bindingResult.getFieldErrors().stream().collect(collector);
    }

    /**
     * Returns computed pagination.
     *
     * @param page is a sublist of a list of objects.
     * @return computed pagination.
     */
    static int[] computePagination(Page page) {
        Integer totalPages = page.getTotalPages();
        if (totalPages > 7) {
            Integer pageNumber = page.getNumber() + 1;
            Integer[] head = pageNumber > 4 ? new Integer[]{1, -1} : new Integer[]{1, 2, 3};
            Integer[] tail = pageNumber < (totalPages - 3) ? new Integer[]{-1, totalPages} : new Integer[]{totalPages - 2, totalPages - 1, totalPages};
            Integer[] bodyBefore = (pageNumber > 4 && pageNumber < (totalPages - 1)) ? new Integer[]{pageNumber - 2, pageNumber - 1} : new Integer[]{};
            Integer[] bodyAfter = (pageNumber > 2 && pageNumber < (totalPages - 3)) ? new Integer[]{pageNumber + 1, pageNumber + 2} : new Integer[]{};

            List<Integer> list = new ArrayList<>();
            Collections.addAll(list, head);
            Collections.addAll(list, bodyBefore);
            Collections.addAll(list, (pageNumber > 3 && pageNumber < totalPages - 2) ? new Integer[]{pageNumber} : new Integer[]{});
            Collections.addAll(list, bodyAfter);
            Collections.addAll(list, tail);
            Integer[] arr = list.toArray(new Integer[0]);
            int[] res = Arrays.stream(arr).mapToInt(Integer::intValue).toArray();
            return res;
        } else {
            return IntStream.rangeClosed(1, totalPages).toArray();
        }
    }

    /**
     * Returns processed URL string depending on the incoming search parameters on the page in the menu.
     *
     * @param urlArray incoming search parameters.
     * @return processed URL string.
     */
    static StringBuilder getUrlBuilder(List<String> urlArray) {
        StringBuilder stringBuilder = new StringBuilder();

        if (urlArray.get(0).contains("женский") || urlArray.get(0).contains("мужской")) {
            stringBuilder.append("?gender=" + urlArray.get(0));
        } else {
            stringBuilder.append("?perfumers=" + urlArray.get(0).replaceAll("\\s+", "+"));
        }

        for (int i = 1; i < urlArray.size(); i++) {
            if (urlArray.get(i).contains("женский") || urlArray.get(i).contains("мужской")) {
                stringBuilder.append("&gender=" + urlArray.get(i));
            } else {
                stringBuilder.append("&perfumers=" + urlArray.get(i).replaceAll("\\s+", "+"));
            }
        }

        return stringBuilder;
    }
}

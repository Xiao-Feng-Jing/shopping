package com.test;

import java.util.HashSet;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/04/23:53
 * @Description:
 **/
public class Test {
    public static void main(String[] args) {
        String id = "1/3/4";
        String[] cids =id.split("/");
        Set<Object> cidSet = new HashSet<>();
        for (String cid : cids) {
            cidSet.add(cid);
        }
        System.out.println(cidSet);
    }
}

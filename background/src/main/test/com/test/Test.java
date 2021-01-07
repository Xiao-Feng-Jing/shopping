package com.test;

import com.service.GoodsService;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/04/23:53
 * @Description:
 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring.xml")
public class Test {
    @org.junit.Test
    public void  main() {
        String id = "1/3/4";
        String[] cids =id.split("/");
        Set<Object> cidSet = new HashSet<>();
        for (String cid : cids) {
            cidSet.add(cid);
        }
        System.out.println(UUID.randomUUID().toString());
    }

    @Autowired
    private GoodsService service;

    @org.junit.Test
    public void junit() {
        System.out.println(service.queryPage(Long.valueOf(2),Long.valueOf(5),null,null));
    }
}

package com.test;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pojo.GoodsCategory;
import com.pojo.SpecGroup;
import com.service.CategoryService;
import com.service.SpecGroupService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import javax.annotation.Resources;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath*:spring.xml")
public class TestCategory {

    @Resource
    private CategoryService categoryService;
    @Resource
    private SpecGroupService specGroupService;
    @Test
    public void insert(){

        String name = "手机配件";
        int parent = 2;
        int level = 2;
        int id = categoryService.maxId()+1;
        System.out.println(parent);
        System.out.println(name);
        GoodsCategory goodsCategory = new GoodsCategory();
        goodsCategory.setCategoryId(id);
        goodsCategory.setCategoryName(name);
        goodsCategory.setParentId(parent);
        goodsCategory.setCategoryLevel(level);
        int n = categoryService.insert(goodsCategory);

    }
    public int level(int parent){
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",parent);
        GoodsCategory goodsCategory = categoryService.select(queryWrapper);
        int level = goodsCategory.getCategoryLevel()+1;
        return level;
    }

    @Test
    public void delete(){
        int id = 50;
        int n =categoryService.delete(id);
        System.out.println(n);
    }

    @Test
    public void select(){
        SpecGroup specGroup = specGroupService.findID(1);
        System.out.println(specGroup);
        specGroup.setStatus(0);
        int n = specGroupService.deleteId(specGroup);
        System.out.println(n);
    }
}

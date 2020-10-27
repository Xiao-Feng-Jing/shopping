package com.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mapper.CategoryMapper;
import com.pojo.GoodsCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    public List<GoodsCategory> findAll(){
        return categoryMapper.selectList(null);
    }

    public GoodsCategory select(QueryWrapper queryWrapper){
        return categoryMapper.selectOne(queryWrapper);
    }

    public int update(GoodsCategory goodsCategory, QueryWrapper queryWrapper){
        return categoryMapper.update(goodsCategory,queryWrapper);
    }

    public int insert(GoodsCategory goodsCategory){
        return categoryMapper.insert(goodsCategory);
    }

    public int maxId(){
        return categoryMapper.maxID();
    }
}

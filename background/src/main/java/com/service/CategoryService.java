package com.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mapper.CategoryMapper;
import com.pojo.GoodsCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author zengkan
 */
@Service
public class CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    public List<GoodsCategory> findAll(QueryWrapper<GoodsCategory> queryWrapper){
        System.out.println(categoryMapper.selectList(queryWrapper));
        return categoryMapper.selectList(queryWrapper);
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

    public int delete(int id) {
        int n =categoryMapper.delete(id);
        int s =categoryMapper.deleteParent(id);
        if (n!=0&&s>=0){
            return 1;
        }else {
            return 0;
        }
    }
    public int selectName(QueryWrapper queryWrapper){
        return categoryMapper.selectCount(queryWrapper);
    }

    public int updateName(String name, int parent, int level) {
        return categoryMapper.updateName(name, parent, level);
    }

    public List<GoodsCategory> findlevel(QueryWrapper<GoodsCategory> queryWrapper) {
        return categoryMapper.selectList(queryWrapper);
    }

    public List<String> queryNameById(List<? extends Number> asList) {
        return categoryMapper.queryNameById(asList);
    }
}

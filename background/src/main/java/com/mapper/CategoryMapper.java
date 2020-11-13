package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.GoodsCategory;

public interface CategoryMapper extends BaseMapper<GoodsCategory>{
    int maxID();
    int delete(int id);
    int deleteParent(int id);
}

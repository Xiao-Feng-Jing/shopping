package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.GoodsCategory;
import org.apache.ibatis.annotations.Param;

/**
 * @author zengkan
 */
public interface CategoryMapper extends BaseMapper<GoodsCategory>{
    int maxID();
    int delete(int id);
    int deleteParent(int id);

    int updateName(@Param("name") String name,@Param("parent") int parent,@Param("level") int level);
}

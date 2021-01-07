package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.GoodsCategory;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author zengkan
 */
@Repository
public interface CategoryMapper extends BaseMapper<GoodsCategory>{
    int maxID();
    int delete(int id);
    int deleteParent(int id);

    int updateName(@Param("name") String name,@Param("parent") int parent,@Param("level") int level);

    List<String> queryNameById(List<? extends Number> asList);
}

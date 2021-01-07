package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.SpecGroup;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * @author zengkan
 */
@Repository
public interface SpecGroupMapper extends BaseMapper<SpecGroup> {
    int maxID();

    List<SpecGroup> findCID(Set<Object> idSet);

    int updateName(@Param("name") String name,@Param("cid") int cid);

    List<SpecGroup> specCategory(Set<Object> idSet);
}

package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.SpecParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Set;

/**
 * @author zengkan
 */
public interface SpecParamMapper extends BaseMapper<SpecParam> {
    int maxID();

    void updateGroup(int id);

    int updateName(SpecParam param);


    List<SpecParam> findIdSku(Set<Object> cidSet);
}

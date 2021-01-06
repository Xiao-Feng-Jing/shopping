package com.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mapper.SpecParamMapper;
import com.pojo.SpecParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author zengkan
 */
@Service
public class SpecParamService {

    @Autowired
    private SpecParamMapper specParamMapper;

    public List<SpecParam> find(QueryWrapper queryWrapper){
        return specParamMapper.selectList(queryWrapper);
    }

    public int maxID() {
        return specParamMapper.maxID();
    }

    public int insert(SpecParam specParam) {
        return specParamMapper.insert(specParam);
    }

    public SpecParam findId(int id) {
        return specParamMapper.selectById(id);
    }

    public int deleteId(Integer id) {
        return specParamMapper.deleteById(id);
    }

    public int updateId(SpecParam specParam) {
        return specParamMapper.updateById(specParam);
    }

    public int selectName(QueryWrapper<SpecParam> queryWrapper) {
        return specParamMapper.selectCount(queryWrapper);
    }

    public void deleteGroupById(int id) {
        QueryWrapper<SpecParam> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("group_id",id);
        specParamMapper.delete(queryWrapper);
    }

    public int updateName(SpecParam specParam) {
        return specParamMapper.updateName(specParam);
    }

    public Object findIdSku(String cid) {
        String[] ids =cid.split("/");
        Set<Object> cidSet = new HashSet<Object>();
        cidSet.addAll(Arrays.asList(ids));
        List<SpecParam> specParams =  specParamMapper.findIdSku(cidSet);
        System.out.println(specParams);
        return specParams;
    }

}

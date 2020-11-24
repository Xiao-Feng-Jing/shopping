package com.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mapper.SpecParamMapper;
import com.pojo.SpecParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public int deleteId(SpecParam specParam) {
        return specParamMapper.updateById(specParam);
    }

    public int updateId(SpecParam specParam) {
        return specParamMapper.updateById(specParam);
    }

    public int selectName(QueryWrapper<SpecParam> queryWrapper) {
        return specParamMapper.selectCount(queryWrapper);
    }

    public void deleteGroupById(int id) {
        specParamMapper.updateGroup(id);
    }

    public int updateName(String name, int cid, int gid) {
        return specParamMapper.updateName(name,cid, gid);
    }
}

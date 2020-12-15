package com.action;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pojo.GoodsCategory;
import com.pojo.SpecGroup;
import com.pojo.SpecParam;
import com.service.SpecGroupService;
import com.service.SpecParamService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author zengkan
 */
@Service
@RequestMapping("/spec")
public class SpecAction {

    @Autowired
    private SpecGroupService specGroupService;

    @Autowired
    private SpecParamService specParamService;

    //查询分类名下的所有规格组；
    @ResponseBody
    @RequestMapping("/findSpec")
    public String findID(@RequestParam("cid") Integer cid){
        System.out.println(cid);
        QueryWrapper<SpecGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid",cid)
               .eq("status",1);
        List<SpecGroup> list = specGroupService.findCID(queryWrapper);
        return JSON.toJSONString(list);
    }

    //改变规格组状态并改变子规格状态；
    @ResponseBody
    @RequestMapping("specGroupDelete")
    public String deleteId(@RequestParam("id") Integer id){
        SpecGroup specGroup = specGroupService.findId(id);
        specGroup.setStatus(0);
        int n = specGroupService.deleteId(specGroup);
        specParamService.deleteGroupById(id);
        return n+"";
    }

    //增加某个分类下的规格组；
    @ResponseBody
    @RequestMapping("addSpecGroup")
    public String addSpec(@RequestParam("name") String name, @RequestParam("cid") Integer cid){

        int id = specGroupService.maxID()+1;
        int n = 0;
        QueryWrapper<SpecGroup> queryWrapper = new QueryWrapper<SpecGroup>();
        queryWrapper.eq("name",name).eq("cid",cid);
        int a = specGroupService.selectName(queryWrapper);
        if (a > 0) {
            n = specGroupService.updateName(name,cid);
        }else {
            SpecGroup specGroup = new SpecGroup();
            specGroup.setId(id);
            specGroup.setName(name);
            specGroup.setCid(cid);
            specGroup.setStatus(1);
            n = specGroupService.add(specGroup);
        }

        return n+"";
    }

    //修改规格组信息；
    @ResponseBody
    @RequestMapping("/updateSpecGroup")
    public String updateSpec(@RequestParam("name") String name, @RequestParam("id") Integer id){
        SpecGroup specGroup = specGroupService.findId(id);
        specGroup.setName(name);
        return specGroupService.updateId(specGroup)+"";
    }

    //查询规格组名称是否存在；
    @ResponseBody
    @RequestMapping("/GroupName")
    public String GroupName(@RequestParam("name") String name,
                            @RequestParam("id") Integer id,
                            @RequestParam("cid") Integer cid){
        QueryWrapper<SpecGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name)
                .eq("cid",cid)
                .eq("status",1);
        if (id!=null){
            queryWrapper.ne("id",id);
        }
        return specGroupService.selectName(queryWrapper)+"";
    }

    //查询分类和规格组下的规格；
    @ResponseBody
    @RequestMapping("specParam")
    public String findSpecParam(@RequestParam("cid") Integer cid,
                                @RequestParam("gid") Integer gid){
        QueryWrapper<SpecParam> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid",cid)
                .eq("group_id",gid)
                .eq("status",1);
        List<SpecParam> list = specParamService.find(queryWrapper);
        return JSON.toJSONString(list);
    }

    //添加相应分类和规格组下的规格；
    @ResponseBody
    @RequestMapping("addSpecParam")
    public String insertSpecParam(@RequestParam("cid") Integer cid,
                                  @RequestParam("groupId") Integer gid,
                                  @RequestParam("name") String name,
                                  @RequestParam("generic") Integer generic){
        QueryWrapper<SpecParam> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name)
                .eq("cid",cid)
                .eq("group_id",gid);
        int a  = specParamService.selectName(queryWrapper);
        int n =0;
        if (a > 0) {
            n = specParamService.updateName(name,cid,gid);
        }else {
            int id = specParamService.maxID()+1;
            SpecParam specParam= new SpecParam();
            specParam.setId(id);
            specParam.setName(name);
            specParam.setGeneric(generic);
            specParam.setGroupId(gid);
            specParam.setCid(cid);
            specParam.setStatus(1);
            n = specParamService.insert(specParam);
        }
        return n+"";
    }

    //修改规格信息；
    @ResponseBody
    @RequestMapping("updateSpecParam")
    public String updateSpecParam(@RequestParam("name") String name,
                                  @RequestParam("generic") Integer generic,
                                  @RequestParam("id") Integer id){
        SpecParam specParam= specParamService.findId(id);
        specParam.setName(name);
        specParam.setGeneric(generic);
        return specParamService.updateId(specParam)+"";
    }

    //修改规格的状态；
    @ResponseBody
    @RequestMapping("specParamDelete")
    public String paramDeleteId(@RequestParam("id") Integer id){
        SpecParam specParam = specParamService.findId(id);
        specParam.setStatus(0);
        return specParamService.deleteId(specParam)+"";
    }

    //查询规格名是否存在；
    @ResponseBody
    @RequestMapping("ParamName")
    public String ParamName(@RequestParam Integer gid,
                            @RequestParam String name,
                            @RequestParam Integer id,
                            @RequestParam Integer cid){
        QueryWrapper<SpecParam> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name)
                .eq("cid",cid)
                .eq("group_id",gid)
                .eq("status",1);

        if (id!=null){
            queryWrapper.ne("id",id);
        }

        return specParamService.selectName(queryWrapper)+"";
    }
}

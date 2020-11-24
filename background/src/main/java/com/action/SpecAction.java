package com.action;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pojo.GoodsCategory;
import com.pojo.SpecGroup;
import com.pojo.SpecParam;
import com.service.SpecGroupService;
import com.service.SpecParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author zengkan
 */
@Service
@RequestMapping(value = "/spec.do")
public class SpecAction {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private SpecGroupService specGroupService;

    @Autowired
    private SpecParamService specParamService;

    //查询分类名下的所有规格组；
    @ResponseBody
    @RequestMapping(params = "p=findSpec")
    public String findID(){
        int cid = Integer.parseInt(request.getParameter("cid"));
        QueryWrapper<SpecGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid",cid)
                .eq("status",1);
        List<SpecGroup> list = specGroupService.findCID(queryWrapper);
        return JSON.toJSONString(list);
    }

    //改变规格组状态并改变子规格状态；
    @ResponseBody
    @RequestMapping(params = "p=specGroupDelete")
    public String deleteId(){
        int id = Integer.parseInt(request.getParameter("id"));
        SpecGroup specGroup = specGroupService.findId(id);
        specGroup.setStatus(0);
        int n = specGroupService.deleteId(specGroup);
        specParamService.deleteGroupById(id);
        return n+"";
    }

    //增加某个分类下的规格组；
    @ResponseBody
    @RequestMapping(params = "p=addSpecGroup")
    public String addSpec(){
        String name = request.getParameter("name");
        int id = specGroupService.maxID()+1;
        int cid = Integer.parseInt(request.getParameter("cid"));
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
    @RequestMapping(params = "p=updateSpecGroup")
    public String updateSpec(){
        String name = request.getParameter("name");
        int id = Integer.parseInt(request.getParameter("id"));
        SpecGroup specGroup = specGroupService.findId(id);
        specGroup.setName(name);
        int n = specGroupService.updateId(specGroup);
        return n+"";
    }

    //查询规格组名称是否存在；
    @ResponseBody
    @RequestMapping(params = "p=GroupName")
    public String GroupName(){
        String name = request.getParameter("name");
        String id = request.getParameter("id");
        int cid = Integer.parseInt(request.getParameter("cid"));
        QueryWrapper<SpecGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name)
                .eq("cid",cid)
                .eq("status",1);
        int n=0;
        if (id!=null){
            int gid = Integer.parseInt(id);
            queryWrapper.ne("id",gid);
        }
        n = specGroupService.selectName(queryWrapper);
        return n+"";
    }

    //查询分类和规格组下的规格；
    @ResponseBody
    @RequestMapping(params = "p=specParam")
    public String findSpecParam(){
        int cid = Integer.parseInt(request.getParameter("cid"));
        int gid = Integer.parseInt(request.getParameter("gid"));
        QueryWrapper<SpecParam> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid",cid)
                .eq("group_id",gid)
                .eq("status",1);
        List<SpecParam> list = specParamService.find(queryWrapper);
        return JSON.toJSONString(list);
    }

    //添加相应分类和规格组下的规格；
    @ResponseBody
    @RequestMapping(params = "p=addSpecParam")
    public String insertSpecParam(){
        int cid = Integer.parseInt(request.getParameter("cid"));
        int gid = Integer.parseInt(request.getParameter("groupId"));
        String name = request.getParameter("name");
        int generic = Integer.parseInt(request.getParameter("generic"));
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
    @RequestMapping(params = "p=updateSpecParam")
    public String updateSpecParam(){
        String name = request.getParameter("name");
        int generic = Integer.parseInt(request.getParameter("generic"));
        int id = Integer.parseInt(request.getParameter("id"));
        SpecParam specParam= specParamService.findId(id);
        specParam.setName(name);
        specParam.setGeneric(generic);
        int n = specParamService.updateId(specParam);
        return n+"";
    }

    //修改规格的状态；
    @ResponseBody
    @RequestMapping(params = "p=specParamDelete")
    public String paramDeleteId(){
        int id = Integer.parseInt(request.getParameter("id"));
        SpecParam specParam = specParamService.findId(id);
        specParam.setStatus(0);
        int n = specParamService.deleteId(specParam);
        return n+"";
    }

    //查询规格名是否存在；
    @ResponseBody
    @RequestMapping(params = "p=ParamName")
    public String ParamName(){
        int gid = Integer.parseInt(request.getParameter("gid"));
        String name = request.getParameter("name");
        String id = request.getParameter("id");
        int cid = Integer.parseInt(request.getParameter("cid"));
        QueryWrapper<SpecParam> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name)
                .eq("cid",cid)
                .eq("group_id",gid)
                .eq("status",1);
        int n=0;
        if (id!=null){
            queryWrapper.ne("id",Integer.parseInt(id));
        }
        n = specParamService.selectName(queryWrapper);
        return n+"";
    }
}

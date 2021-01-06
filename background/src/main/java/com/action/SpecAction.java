package com.action;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pojo.SpecGroup;
import com.pojo.SpecParam;
import com.service.SpecGroupService;
import com.service.SpecParamService;
import com.vo.ResponseBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author zengkan
 */
@Controller
@RequestMapping("/spec")
public class SpecAction {

    @Autowired
    private SpecGroupService specGroupService;

    @Autowired
    private SpecParamService specParamService;

    /**
     * 查询分类名下的所有规格组；
     */
    @ResponseBody
    @RequestMapping("/findSpec")
    public ResponseBean findId(@RequestParam("cid") Integer cid){
        return new ResponseBean(200L,"查询成功",specGroupService.findCID(cid));
    }

    /**
     * 改变规格组状态并改变子规格状态；
     */
    @ResponseBody
    @RequestMapping("specGroupDelete")
    public int deleteId(@RequestParam("id") Integer id){
        return specGroupService.deleteId(id);
    }

    /**
     * 增加某个分类下的规格组；
     */
    @ResponseBody
    @RequestMapping("addSpecGroup")
    public ResponseBean addSpec(@RequestParam("name") String name, @RequestParam("cid") Integer cid){

        SpecGroup specGroup = new SpecGroup();
        specGroup.setName(name);
        specGroup.setCid(cid);
        specGroup.setStatus(1);
        int n = specGroupService.add(specGroup);
        if (n > 0) {
            return new ResponseBean(200L,"添加成功",specGroup.getId());
        }else {
            return new ResponseBean(500L,"添加失败",null);
        }

    }

    /**
     * 修改规格组信息；
     */
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
    public String groupName(@RequestParam("name") String name,
                            @RequestParam("cid") Integer cid){
        QueryWrapper<SpecGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name)
                .eq("cid",cid)
                .eq("status",1);
        return specGroupService.selectName(queryWrapper)+"";
    }

    //添加相应分类和规格组下的规格；
    @ResponseBody
    @RequestMapping("addSpecParam")
    public ResponseBean insertSpecParam(SpecParam param){
        param.setStatus(1);
        int n = specParamService.insert(param);
        if (n!=0){
            return new ResponseBean(200L,"添加成功",param.getId());
        }else {
            return new ResponseBean(500L,"添加失败",null);
        }

    }

    //修改规格信息；
    @ResponseBody
    @RequestMapping("updateSpecParam")
    public String updateSpecParam(SpecParam param){
        SpecParam specParam= specParamService.findId((int) param.getId());
        specParam.setName(param.getName());
        specParam.setGeneric(param.getGeneric());
        return specParamService.updateId(specParam)+"";
    }

    //修改规格的状态；
    @ResponseBody
    @RequestMapping("specParamDelete")
    public String paramDeleteId(@RequestParam("id") Integer id){
        return specParamService.deleteId(id)+"";
    }

    //查询规格名是否存在；
    @ResponseBody
    @RequestMapping("ParamName")
    public String paramName(@RequestParam String name,
                            @RequestParam Integer cid,
                            @RequestParam Integer gid){
        QueryWrapper<SpecParam> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name",name)
                .eq("cid",cid)
                .eq("group_id",gid)
                .eq("status",1);
        return specParamService.selectName(queryWrapper)+"";
    }

    /**
     *查询分类下的通用规格
     * */
    @RequestMapping("/findSpecCategory")
    public @ResponseBody ResponseBean findSpecCategory(@RequestParam String cid){
        try {
            return new ResponseBean(200L,"查询成功",this.specGroupService.findIdList(cid));
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseBean(500L,"服务器错误",null);
        }

    }
    /**
     *查询分类下的特有规格
     * */
    @RequestMapping("/findSpecSku")
    public @ResponseBody ResponseBean findSpecSku(@RequestParam String cid){
        try {
            return new ResponseBean(200L,"查询成功",this.specParamService.findIdSku(cid));
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseBean(500L,"服务器错误",null);
        }

    }
}

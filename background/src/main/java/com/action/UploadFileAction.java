package com.action;

import com.service.AddFileImage;
import com.vo.ResponseBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/03/17:05
 * @Description:
 **/
@RestController
public class UploadFileAction {

    @Autowired
    private AddFileImage addFileImage;

    @PostMapping(value = "/upload")
    public ResponseBean fileUpload(@RequestParam(value = "file") MultipartFile uploadImage) {
        return new ResponseBean(200L,"图片上传成功",this.addFileImage.addFileImage(uploadImage));
    }
}

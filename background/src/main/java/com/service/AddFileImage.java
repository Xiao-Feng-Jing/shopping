package com.service;

import com.pojo.Image;
import com.util.FileUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/03/17:15
 * @Description:
 **/
@Service
public class AddFileImage {

    public Image addFileImage( MultipartFile file){
        String pathSuffix = "spec_detail/";
        String fileUrl = FileUtil.fileUpload(file,pathSuffix);
        Image image = new Image();
        image.setImageUrl(fileUrl);
        return image;
    }
}

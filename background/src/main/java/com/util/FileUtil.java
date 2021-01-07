package com.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/03/17:15
 * @Description:
 **/

public class FileUtil {

    public static String fileUpload(MultipartFile file,String path) {
        long time = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String pathSuffix=path+sdf.format(time)+"/";
        String fileName = time+"_goods";
        String suffix = getSuff(file.getOriginalFilename());
        String fileUrl = fileName + suffix;
        System.out.println(fileUrl);
        InputStream inputStream = null;
        try {
            inputStream = file.getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String result = FtpUtil.putImages(inputStream,pathSuffix+fileUrl);
        if ("".equals(result)) {
            return "文件上传错误";
        }
        return result;
    }
    private static String getSuff(String originalFilename) {
        int su = originalFilename.lastIndexOf(".");
        String suffix = originalFilename.substring(su);
        return suffix;
    }
}

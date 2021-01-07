package com.test;

import java.io.*;

import com.util.FtpUtil;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

/**
 * ftp上传下载工具类
 * <p>Title: FtpUtil</p>
 * <p>Description: </p>
 * @version 1.0
 */
@Controller
@Service
public class FtpUtils {

    public static void main(String[] args) {
        try {
            FileInputStream in=new FileInputStream(new File("C:\\Users\\Administrator\\Desktop\\BS_USER_PIC_2020-07-06-11-46-05.png"));
            String flag = FtpUtil.putImages(in,"BS_US.png" );
            System.out.println(flag);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
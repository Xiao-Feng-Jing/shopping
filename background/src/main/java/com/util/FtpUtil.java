package com.util;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/03/17:33
 * @Description:
 **/
@Component
@PropertySource(value = {"classpath:ftp.properties"})
public class FtpUtil {



    private static String host;
    private static int port;
    private static String userName;
    private static String password;
    private static String rootPath;
    private static String imgUrl;

    public static String getHost() {
        return host;
    }

    @Value(value = "${ftp.host}")
    public void setHost(String host) {
        FtpUtil.host = host;
    }

    public static int getPort() {
        return port;
    }

    @Value(value ="${ftp.port}")
    public void setPort(int port) {
        FtpUtil.port = port;
    }

    public static String getUserName() {
        return userName;
    }

    @Value(value ="${ftp.userName}")
    public void setUserName(String userName) {
        FtpUtil.userName = userName;
    }

    public static String getPassword() {
        return password;
    }

    @Value(value ="${ftp.password}")
    public void setPassword(String password) {
        FtpUtil.password = password;
    }

    public static String getRootPath() {
        return rootPath;
    }

    @Value(value ="${ftp.rootPath}")
    public void setRootPath(String rootPath) {
        FtpUtil.rootPath = rootPath;
    }

    public static String getImgUrl() {
        return imgUrl;
    }

    @Value(value ="${ftp.imageUrl}")
    public void setImgUrl(String imgUrl) {
        FtpUtil.imgUrl = imgUrl;
    }

    private static FTPClient getChannel() throws Exception {
        FTPClient ftpClient= new FTPClient();

        ftpClient.connect(host, port);
        ftpClient.login(userName, password);

        int reply = ftpClient.getReply();
        System.out.println(reply);
        System.out.println(FTPReply.isNegativePermanent(reply));
        if (!FTPReply.isNegativePermanent(reply)){
            System.out.println("成");
            ftpClient.disconnect();
            throw new Exception("ftp连接失败");
        }

        return ftpClient;
    }

    public static String putImages(InputStream inputStream, String imagesName) {
        FTPClient ftp = new FTPClient();
        try {
            ftp.connect(host,port);
            ftp.login(userName, password);
            ftp.enterLocalPassiveMode();
            ftp.setFileType(FTP.BINARY_FILE_TYPE);
            String path = rootPath + "/";
            createDir(rootPath,ftp);
            System.out.println(imagesName);
            createDir(imagesName,ftp);
            ftp.storeFile(path+imagesName, inputStream);
            String resultFile = imgUrl + imagesName;
            return resultFile;
        }catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (ftp != null) {
                try {
                    ftp.disconnect();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return "";
    }

    private static boolean createDir(String path, FTPClient ftp) throws IOException {
        String[] folders = path.split("/");
        for (int i = 0; i < folders.length; i++) {
            String dir = folders[i];
            if (dir.indexOf(".") > -1) {
                if (i != folders.length - 1) {
                    return false;
                }
                break;
            }
            if (!existFile(ftp, FtpUtil.chineseNameConversion(dir))) {
                ftp.makeDirectory(dir);
            }
            ftp.changeWorkingDirectory(dir);
        }
        return true;
    }

    private static boolean existFile(FTPClient ftp, String path) throws IOException {
        boolean flag = false;
        FTPFile[] ftpFileArr = ftp.listFiles(path);
        if (ftpFileArr.length > 0) {
            flag = true;
        }
        return flag;
    }

    private static String chineseNameConversion(String dir) throws UnsupportedEncodingException {
        if (dir ==null){
            return null;
        }
        return new String(dir.getBytes("gbk"), "iso-8859-1");
    }

    public static void delImages(String imagesName) {
        try {
            FTPClient ftp = getChannel();
            String path = rootPath + "/" + imagesName;
            ftp.removeDirectory(path);
            ftp.quit();
            ftp.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

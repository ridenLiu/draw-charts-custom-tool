package com.hongyou.drawchartscustomtool.util;

import com.alibaba.fastjson.JSONObject;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class FileUtil {
    // 当前项目的绝对路径
    public static final String PROJECT_PATH;
    // 项目的src的绝对路径
    public static final String PROJECT_SRC_PATH;
    private static String s = File.separator;

    static {
        PROJECT_PATH = System.getProperty("user.dir");
        PROJECT_SRC_PATH = PROJECT_PATH + s + "src" + s;
    }

    /**
     * 将json字符串保存为json文件
     *
     * @param filePath 文件路径,从当前项目的src路径开始,例如:main\resources\json\testFile.json
     * @param jsonStr  json字符串
     * @throws IOException
     */
    public static void saveJsonFile(String filePath, String jsonStr) throws IOException {
        String path = PROJECT_SRC_PATH + filePath;
        File file = new File(path);
        if (!file.exists()) {
            file.createNewFile();
        }
        FileOutputStream fos = new FileOutputStream(file);
        OutputStreamWriter osw = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
        BufferedWriter bw = new BufferedWriter(osw);
        bw.write(jsonStr);

        bw.flush();
        bw.close();
        osw.close();
        fos.close();
    }

    /**
     * 将json字符串保存为json文件
     *
     * @param filePath   文件路径,从当前项目的src路径开始,例如:main\resources\json\testFile.json
     * @param jsonObject com.alibaba.fastjson.JSONObject对象
     * @throws IOException
     */
    public static void saveJsonFile(String filePath, JSONObject jsonObject) throws IOException {
        String jsonStr = jsonObject.toJSONString();
        saveJsonFile(filePath, jsonStr);
    }

    /**
     * 获取json文件中的字符串
     *
     * @param filePath 文件路径,从当前项目的src路径开始,例如:main\resources\json\testFile.json
     * @return
     * @throws IOException
     */
    public static String getJsonStr(String filePath) throws IOException {
        String path = PROJECT_SRC_PATH + filePath;
        FileInputStream fis = new FileInputStream(path);
        InputStreamReader isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(isr);
        StringBuilder sb = new StringBuilder();
        String s;
        while ((s = br.readLine()) != null) {
            sb.append(s);
        }

        br.close();
        isr.close();
        fis.close();
        return sb.toString();
    }
}

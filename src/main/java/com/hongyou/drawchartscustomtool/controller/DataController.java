package com.hongyou.drawchartscustomtool.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hongyou.drawchartscustomtool.util.FileUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/data")
public class DataController {

    @RequestMapping
    public JSONArray getJson(@RequestParam(value = "projectId[]") String[] projectId) {
        return getData(projectId);
    }

    static String s = File.separator;

    private JSONArray getData(String[] projectId) {
        // 存放json文件目录位置
        String dirPath = "main" + s + "resources" + s + "json" + s;
        String projectPath = dirPath + "project.json";
        JSONArray res = new JSONArray();
        try {
            // 找到project.json文件,并解析为字符串
            String projectStr = FileUtil.getJsonStr(projectPath);
            JSONArray project = JSONArray.parseArray(projectStr);
            for (Object o : project) {
                JSONObject pItem = (JSONObject) o;
                // 找到id的对应项
                for (String value : projectId) {
                    if (pItem.get("projectid").toString().equals(value)) {
                        String functionFileName = pItem.get("functionFile").toString();
                        String functionFilePath = dirPath + functionFileName;
                        JSONObject fItem = JSONObject.parseObject(FileUtil.getJsonStr(functionFilePath));
                        fItem.put("projectName", pItem.get("projectName"));
                        fItem.put("projectid", pItem.get("projectid"));
                        res.add(fItem);
                        break;
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }


}

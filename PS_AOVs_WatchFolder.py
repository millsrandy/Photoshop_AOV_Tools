import os
import time as t2
import shutil
import datetime
import js2py

SRC = "C:/Desktop/WatchFolder/SRC"
DST = "C:/Desktop/WatchFolder/DST"

def watchDir(_dir):
    time_input = t2.time()
    local_time = t2.ctime(time_input)
    print(local_time + " ... Searching ...")
    return os.stat(_dir).st_mtime

initCheck = watchDir(SRC)

while True:
    checkDir = watchDir(SRC)
    cd = datetime.datetime.now()
    currentDate = str(cd.year) + "_" + str(cd.month) + "_" + str(cd.day)
    print(currentDate)
    if checkDir != initCheck:
        print("Files have been added!")
        initCheck = checkDir

        files = os.listdir(SRC)
        for f in files:
            # USD_FileName.mel
            src_file = (SRC + "/" + f)
            # split filename by "_"
            # select split[0] ("USD")
            SRC_split = src_file.split("/")
            DST_split = SRC_split[-1].split("_")
            DST_split = DST_split[0]
            DST_dir = DST + "/" + DST_split + "_" + currentDate
            isExist = os.path.exists(DST_dir)
            if isExist == False:
                os.mkdir(DST_dir)
            dst_file = (DST_dir + "/" + f)
            shutil.move(src_file,dst_file)
            
            # sort by file type
            if f.endswith(".exr"):
                # do something to dst_file
                os.system(dst_file)
                result, tempfile = jst2py.run_file("PS_AOVs_Main.jsx");
                result = tempfile.psAOVsMain();
            if f.endswith(".py"):
                # do something to dst_file
                os.system(dst_file)


    t2.sleep(5) # 5 sec
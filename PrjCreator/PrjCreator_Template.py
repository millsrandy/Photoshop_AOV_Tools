
import os
import os.path

def prjGen(_prjName):
    root = "C:/PROJECTS"
    dirList =[]
    dir = root + "/" + _prjName

    dirList.append(dir)
    dirList.append(dir + "/01-assets")
    dirList.append(dir + "/02-c4d")
    dirList.append(dir + "/03-conversions")
    dirList.append(dir + "/04-psd")
    dirList.append(dir + "/05-ref")
    dirList.append(dir + "/06-render")
    dirList.append(dir + "/07-comp")
    dirList.append(dir + "/08-output")
    dirList.append(dir + "/09-ai")
    dirList.append(dir + "/10-substance")
    dirList.append(dir + "/11-OPEN_CHANNEL")
    dirList.append(dir + "/12-houdini")
    dirList.append(dir + "/02-c4d/archive")
    dirList.append(dir + "/02-c4d/tex")
    dirList.append(dir + "/03-conversions/01-fbx")
    dirList.append(dir + "/03-conversions/02-obj")
    dirList.append(dir + "/03-conversions/03-abc")
    dirList.append(dir + "/06-render/01-lo-res")
    dirList.append(dir + "/06-render/02-hi-res")
    dirList.append(dir + "/07-comp/01-nk")
    dirList.append(dir + "/07-comp/02-ae")
    dirList.append(dir + "/08-output/01-lookdev")
    dirList.append(dir + "/08-output/02-wip")
    dirList.append(dir + "/08-output/03-final")

    for x in dirList:
        if x != True:
            os.mkdir(x)
        else:
            print("Sorry, directory already exists\nPlease pick another name.")
            print("--> " + x)

    path = os.path.realpath(dir)
    os.startfile(path)

_inputText = input("\n\n\nWhat do you want to name the project? : ")
prjGen(_inputText)

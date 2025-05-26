from os import listdir, remove
from os.path import isfile, join
import cv2

mediapaths = ["portfolio/assets/3d", "portfolio/assets/photography"]
MAX_THUMB_RES = 480

for mediapath in mediapaths:
    # Delete old low-quality
    lqfiles = [join(join(mediapath, "lq"), f) for f in listdir(join(mediapath, "lq")) if isfile(join(join(mediapath, "lq"), f)) and not ".json" in f]
    for lqfile in lqfiles:
        remove(lqfile)
    
    # Generate new low-quality
    files = [f for f in listdir(mediapath) if isfile(join(mediapath, f)) and not ".json" in f]
    onlyfiles = str([f for f in listdir(mediapath) if isfile(join(mediapath, f)) and not ".json" in f]).replace(" ","").replace("[", "[\n    ").replace(",",",\n    ").replace("]","\n]").replace("'", '"')
    open(f"{mediapath}/media.json", "w+", encoding="utf-8").write(onlyfiles)
    for file in files:
        try:
            im = cv2.imread(mediapath+"/"+file)
            scale = 1.0
            if (im.shape[0] > im.shape[1]):
                scale = min(MAX_THUMB_RES / im.shape[0], 1.0)
            else:
                scale = min(MAX_THUMB_RES / im.shape[1], 1.0)
            im = cv2.resize(im, (int(scale * im.shape[1]), int(scale * im.shape[0])))
            print(im.shape)
            cv2.imwrite(mediapath+"/lq/"+file[:file.find(".")]+".webp", im, [cv2.IMWRITE_WEBP_QUALITY, 30])
        except Exception as e:
            print(e)
            pass
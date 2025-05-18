from os import listdir
from os.path import isfile, join

mediapath = "portfolio/assets/3d"

onlyfiles = str([f for f in listdir(mediapath) if isfile(join(mediapath, f)) and not ".json" in f]).replace(" ","").replace("[", "[\n    ").replace(",",",\n    ").replace("]","\n]").replace("'", '"')

print(onlyfiles)
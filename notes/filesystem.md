```bash
# the video slug
<video-slug>
    # anything that is safe to be deleted upon publishing
    Misc/
        # webhooks to be sent, these are HTTP RFC spec files
        Webhooks/

        # any files downloaded from the internet to be deleted
        # once video gets published
        Downloads/
    
    # this folder can contain anything that is not
    # a part of the video itself, but is related to it
    Metadata/
        # the script file of the video written in special
        # syntax inspired by Handlebars
        Script.nir

        # images used for the video, like thumbnails
        # banners, posters, ads etc
        Images/
            # the raw sources files, which can be in any format
            Sources/

            # rendered images in JPG, PNG formats
            Renders/
    
    # files that make up the video itself
    Media/
        # audio files divided into 3 sub sections
        Audio/
            # music files used within this video
            Music/

            # processed audio from Raw folder
            Processed/

            # raw audio recordings to be used within this video
            # only used when audio is separately recorded from the video
            # otherwise, raw audio can be found within the Video/ folder
            Raw/
        
        # screenshots of various frames useful for mixing and
        # error correcting videos
        Frames/

        # raw recorded videos from a camera or a screen recorder
        Video/
    
    # the folder where rendered video is stored as mp4 ready
    # to be published
    Output/
        # the video file should be following this particular format
        <slug>.mp4
    
    # the project file from the video editor used
    <slug>.<file_extension>
```

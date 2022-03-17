import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';

import {useState,useEffect,useCallback, useRef} from 'react';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { useHistory } from "react-router-dom";

import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from "@material-ui/core/styles";

const styless = makeStyles((theme) => ({
  root: {
    background: '#4caf50'
  }
}));
// Code for Image crop 

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}

// End of Image crop 

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {

  // More Code for Image Crop 
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);


  const classes = styless();
  

  const onSelectFile = (e) => {


    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);
  
  // End of Crop Image code 

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const file = new File(["foo"], "", {
    type: "text/plain",
  });

  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		//setIsSelected(true);
	};
   

  const [fileList, setFileList] = useState();

  useEffect(() => {
    console.log(fileList);
  });

  const onDropzoneAreaChange = (files,e) => {
  
    setFileList(files);
    //console.log(fileList);
    //console.log("Files:", files);

  //   if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){
  //     alert('not an image');
  // }
  }; 



  const history = useHistory();
  const[filename,setFileName]= useState([]);
  const[filesNa,setFilesNa]= useState([]);
  const[modelImg,setModelImg] = useState('');

  const handleChange = (e) =>
  {
      if(!e.target.files[0].name.match(/.(pdf|docx)$/i))
      { 
          const reader = new FileReader();
          reader.addEventListener('load', () => setFileName(reader.result));
          reader.readAsDataURL(e.target.files[0]);
          setFileName(e.target.files[0].name)
          }
        else
        {
          setFilesNa(handleClicks) // Code for Alert message show below 
          setFilesNa(e.target.files[0].name)
        }
  }
  
   // Code for Snackbar 

   const [opens, setOpens] = React.useState(false);

   const handleClicks = () => {
     setOpens(true);
   };
 
   const handleCloses = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
 
     setOpens(false);
   };
  return (
    <div>
     <Box mt={4}><Typography align="center" variant="h4">Upload Image and  Crop Image</Typography></Box>
    <Button onClick={handleClickOpen} variant="contained" style={{background:"#2121a5",color:"white",marginTop:"50px"}} ><PublishIcon/>Chooce File</Button>
      <div>  
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
       <div> {filename != '' ? <Typography><b> Image Crop </b></Typography> : <Typography><b> File Upload </b></Typography> } </div>
      </DialogTitle>
       
          <DialogContent dividers>
            <Box >
            <div className="File" style={{width:"300px"}}>
              <Box align="center" mt={2}>
                
              {filename != '' ? <p></p> : <CloudUploadIcon color="disabled" fontSiz="large"  style={{width:40, height:40,}}/>  }</Box >

              {filename != '' ? <Typography align="center">Click and drag for cropping</Typography> : <Typography align="center">{ filesNa != '' ? <p><Alert>{filesNa}</Alert> </p> : <h4>No File Selected</h4>}</Typography>  }
                       
            </div>
 
            <div className="Image" style={{marginTop:"10px"}}>
             <form>
              <ReactCrop
                src={filename}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                style={{height:"120px",width:"200px"}}
              />
               <div>
                <canvas
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0)
                  }}
                />
             </div>
            
              </form>
            </div>  
            {filename != '' ?
            
            <Box align="center" mt={2}><Button type="button" size="small"  variant="contained" color="secondary"  disabled={!completedCrop?.width || !completedCrop?.height}onClick={() =>generateDownload(previewCanvasRef.current, completedCrop)}>Download</Button></Box>
            
              : <Box align="center">
                 <Button variant="contained" style={{color:"green", marginTop:"10px"}} size="small" component="label" >
                   Choose File
                 <input  type="file" accept=".png, .jpg, .jpeg, .pdf,.docx"  hidden onChange={handleChange}/>
                 </Button>   
               </Box>
                }
              </Box>
            
        </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} style={{color:"green"}}>
         Submit
        </Button>
       
      </DialogActions>
    </Dialog>
    </div>
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
       
        open={opens}
        autoHideDuration={6000}
        onClose={handleCloses}
        message="File Uploaded Successfully"
        ContentProps={{
          classes: {
            root: classes.root
          }
        }}
        action={
          <React.Fragment>
           
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloses}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}


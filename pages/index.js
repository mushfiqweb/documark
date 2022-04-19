import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';

import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function Index() {

  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [isWaterMarked, setIsWaterMarked] = useState(false);
  const [waterMarkText, setWaterMarkText] = useState("");
  const [downloadURL, setDownloadURL] = useState(null);

  const uploadToClient = (event) => {
    console.log('HIT')
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      console.log(event.target.files[0]);

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setWaterMarkText(e.target.value);
  }

  async function modifyPdf() {
    const url = createObjectURL;
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    console.log({ pdfDoc });
    const pages = pdfDoc.getPages();

    pages.forEach(page => { });

    pages.forEach(page => {
      page.drawText(waterMarkText, {
        x: 10,
        y: 20,
        size: 30,
        color: rgb(0.95, 0.1, 0.1)
      });
    });

    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    console.log({ width, height });
    firstPage.drawText(waterMarkText, {
      x: 10,
      y: 20,
      size: 30,
      color: rgb(0.95, 0.1, 0.1)
    });

    const pdfBytes = await pdfDoc.save();

    try {
      const pdfBLOB = new Blob([pdfBytes], { type: "application/pdf" });

      setDownloadURL(URL.createObjectURL(pdfBLOB));
      setTimeout(() => {
        setIsWaterMarked(true);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <div>
          <h2>Select PDF</h2>
          <input type="file" name="myImage" onChange={uploadToClient} />
        </div>

        <section className="watermark-section">
          <TextField id="standard-basic" label="Watermark text" onChange={handleInput} />


        </section>
        <Button variant="contained" onClick={modifyPdf} color="primary">
            Generate Watermark
          </Button>
        <section className="watermark-section">
          {
            isWaterMarked && (<>
              <a href={downloadURL} download> Click here to download </a>
            </>)
          }
        </section>
      </Box>
    </Container>
  );
}

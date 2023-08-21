import React, { useState } from 'react';
import { f7, Page, Navbar, Button, Popup, Row, Col, Block } from 'framework7-react';
import { BrowserMultiFormatReader } from '@zxing/library';
const BarcodeScanner = () => {
    const [scanning, setscanning] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');
    const [popupOpened, setPopupOpened] = useState(false);
    const videoElement = document.getElementById('video');
    const stopBtnElement = document.getElementById('stopbtn');

    const openPopup = () => {
        setPopupOpened(true);
    };

    const closePopup = () => {
        setPopupOpened(false);
    };
    const OKbtnStopScanning = () => {
        setPopupOpened(false);      
        const videoElement = document.getElementById('video'); // Replace with your video element's ID
        const stream = videoElement.srcObject;

        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
        }

        videoElement.style.display = 'none';
        stopBtnElement.style.display = 'none';
        setShowResult(true);
    }
    const retryScanning = () => {
        setPopupOpened(false);
        f7.views.main.router.navigate('/barcode-reader/');
        setResult('');
        // startVideo();

    };

    const navigateToHome = () => {
        f7.views.main.router.navigate('/');
    };

    const startVideo = () => {
        try {
            new BrowserMultiFormatReader().listVideoInputDevices().then(videoInputDevices => {
                if (videoInputDevices.length > 0) {
                    startScanning(videoInputDevices[0].deviceId);
                }
            });

        } catch (error) {
            console.error('Error starting video stream:', error);
        }
    }
    const startScanning = (deviceId) => {
        setscanning(true);

        new BrowserMultiFormatReader().decodeFromVideoDevice(deviceId, 'video', (result, err) => {
            if (result) {
                setPopupOpened(true);
                setResult(result.text);

                new BrowserMultiFormatReader().reset();

            }
            if (err) {
                console.error('Barcode scanning error:', err);
                new BrowserMultiFormatReader().reset();

            }
        });

    }

    const stopVideo = () => {
        videoElement.style.display = 'none';
    }
    const stopScanning = () => {
        
        const videoElement = document.getElementById('video'); // Replace with your video element's ID
        const stream = videoElement.srcObject;

        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
        }
        f7.views.main.router.navigate('/');

    }
    return (

        <Page>
            <video id="video" width="100%" height="auto" style={{ transform: 'scaleX(-1)' }}></video>
            {scanning == true ? (
                <Button onClick={stopScanning} id="stopbtn">Stop Scanning</Button>
            ) : (
                <Button onClick={startVideo} id="startbtn">Start Scanning</Button>
            )}

            <p>Scan Result: {result}</p>

            <div className="centered-container">
                <Button fill onClick={navigateToHome} className="my-custom-button">
                    Back
                </Button>
            </div>

            <Popup opened={popupOpened} onPopupClosed={closePopup}>
                <Page>
                    <Navbar title="Popup Content" backLink="Close" sliding={false} />
                    <div className="popup-content">
                        <p> 1.Click [OK] button, to check the scan result.</p>
                        <p> 2.Click [Retry] button, to retry the scanner again.</p>
                        <Block strong>
                            <Row tag="p">
                                <Col tag="span">
                                    <Button onClick={OKbtnStopScanning} large raised>
                                        OK
                                    </Button>
                                </Col>
                                <Col tag="span">
                                    <Button onClick={retryScanning} large raised fill>
                                        Retry
                                    </Button>
                                </Col>
                            </Row>
                        </Block>


                    </div>
                </Page>
            </Popup>
        </Page>


    );
};
export default BarcodeScanner;
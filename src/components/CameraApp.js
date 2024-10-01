import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import './CameraApp.css'; // Importing the CSS file

const CameraApp = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [plateNumber, setPlateNumber] = useState("");
  const [carPassed, setCarPassed] = useState("");
  const [detectedPlate, setDetectedPlate] = useState("");
  const [imageGallery, setImageGallery] = useState([]);
  const [largeFeed, setLargeFeed] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [cameraActive]);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    setImageGallery([...imageGallery, imageData]);
    setCameraActive(false);
  };

  const downloadImage = (imageData) => {
    const a = document.createElement("a");
    a.href = imageData;
    a.download = "captured_image.png";
    a.click();
  };

  const clearFields = () => {
    setPlateNumber("");
    setCarPassed("");
    setDetectedPlate("");
    setCapturedImage(null);
  };

  const resetCamera = () => {
    clearFields();
    setCameraActive(false);
  };

  const resetGallery = () => {
    setImageGallery([]);
  };

  return (
    <div className="app-container">
      <Container className="mt-4">
        <Row>
          {/* Camera Section */}
          <Col md={4}>
            <Card className="mb-4 equal-height-card">
              <Card.Header>Camera Feed</Card.Header>
              <Card.Body>
                <div className={`camera-container ${largeFeed ? 'large-feed' : ''}`}>
                  <video ref={videoRef} autoPlay className="video-feed" />
                  <canvas ref={canvasRef} width="640" height="480" className="hidden-canvas" />
                  {!cameraActive && capturedImage && (
                    <img src={capturedImage} alt="Captured" className="captured-image" />
                  )}
                </div>
                <div className="button-group">
                  <Button variant="primary" onClick={() => setCameraActive(true)} className="mb-2">
                    Start Camera
                  </Button>
                  <Button variant="success" onClick={captureImage} disabled={!cameraActive} className="mb-2">
                    Capture Image
                  </Button>
                  <Button variant="secondary" onClick={() => setCameraActive(false)} disabled={!cameraActive} className="mb-2">
                    Cancel Capture
                  </Button>
                 
                  <Button variant="danger" onClick={resetCamera} disabled={!capturedImage} className="mb-2">
                    Reset
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Details Section */}
          <Col md={4}>
            <Card className="mb-4 equal-height-card">
              <Card.Header>Details</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Plate No.</Form.Label>
                    <Form.Control
                      type="text"
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Car Passed</Form.Label>
                    <Form.Control
                      type="text"
                      value={carPassed}
                      onChange={(e) => setCarPassed(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Detected Number Plate</Form.Label>
                    <Form.Control
                      type="text"
                      value={detectedPlate}
                      onChange={(e) => setDetectedPlate(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="warning" onClick={clearFields}>
                    Clear
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
{/* Image Gallery Section */}
<Col md={4}>
  <Card className="mb-4 equal-height-card">
    <Card.Header>Image Gallery</Card.Header>
    <Card.Body>
      {imageGallery.length > 0 ? (
        <Row>
          {imageGallery.map((image, index) => (
            <Col key={index} xs={6} className="mb-3 image-gallery-item">
              <img
                src={image}
                alt={`Captured ${index}`}
                className="gallery-image"
              />
              <div className="gallery-buttons d-flex justify-content-start mt-2">
                <Button
                  variant="primary"
                  onClick={() => downloadImage(image)}
                  className="me-2" // Adds space to the right
                >
                  Download
                </Button>
                <Button
                  variant="danger"
                  onClick={resetGallery}
                >
                  Reset 
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No images captured yet.</p>
      )}
    </Card.Body>
  </Card>
</Col>


        </Row>
      </Container>
    </div>
  );
};

export default CameraApp;

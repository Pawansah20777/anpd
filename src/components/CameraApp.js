import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';

const CameraApp = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [plateNumber, setPlateNumber] = useState('');
  const [carPassed, setCarPassed] = useState('');
  const [detectedPlate, setDetectedPlate] = useState('');
  const [imageGallery, setImageGallery] = useState([]);
  const [largeFeed, setLargeFeed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
      videoRef.current.srcObject = stream;
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    videoRef.current.srcObject = null;
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);
    setImageGallery([...imageGallery, imageData]);
    setCameraActive(false);
  };

  const downloadImage = (imageData) => {
    const a = document.createElement('a');
    a.href = imageData;
    a.download = 'captured_image.png';
    a.click();
  };

  const clearFields = () => {
    setPlateNumber('');
    setCarPassed('');
    setDetectedPlate('');
    setCapturedImage(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const appStyles = {
    backgroundColor: darkMode ? '#343a40' : '#f8f9fa',
    color: darkMode ? 'white' : 'black',
    minHeight: '100vh',
  };

  return (
    <div style={appStyles}>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
        <Navbar.Brand href="#home">Number Plate Detection Application</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Nav.Link>
        </Nav>
      </Navbar>

      <Container className="mt-4">
        <Row>
          {/* Camera Section */}
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Camera Feed</Card.Header>
              <Card.Body>
                <video
                  ref={videoRef}
                  autoPlay
                  className="mb-2"
                  style={{ width: largeFeed ? '100%' : '80%', display: cameraActive ? 'block' : 'none' }}
                />
                <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
                {!cameraActive && capturedImage && (
                  <img src={capturedImage} alt="Captured" style={{ width: '100%' }} className="mb-2" />
                )}
                <Button variant="primary" onClick={() => setCameraActive(true)} className="mr-2">
                  Start Camera
                </Button>
                <Button variant="success" onClick={captureImage} disabled={!cameraActive} className="mr-2">
                  Capture Image
                </Button>
                <Button variant="secondary" onClick={() => setCameraActive(false)} disabled={!cameraActive} className="mr-2">
                  Cancel Capture
                </Button>
                <Button variant="info" onClick={() => setLargeFeed(!largeFeed)} className="mr-2">
                  {largeFeed ? 'Small Feed' : 'Large Feed'}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Details Section */}
          <Col md={6}>
            <Card className="mb-4">
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

            {/* Image Gallery Section */}
            {imageGallery.length > 0 && (
              <Card className="mb-4">
                <Card.Header>Image Gallery</Card.Header>
                <Card.Body>
                  <Row>
                    {imageGallery.map((image, index) => (
                      <Col key={index} xs={6} className="mb-3">
                        <img src={image} alt={`Captured ${index}`} style={{ width: '100%' }} />
                        <Button variant="primary" onClick={() => downloadImage(image)} className="mt-2">
                          Download
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CameraApp;

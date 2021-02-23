import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
 function PhotoCard(props) {
    return (
        <div>
            <Container fluid key={props.id} >
                <Row md={1} lg={1}>
                    <Col sm={12} md={12} lg={6}>
                        <img style={{height:'600px', width:'600px'}} src={props.image} alt={props.altText}/>
                    </Col>
                    <Col sm={12} md={12} lg={6}>
                        <p style={{textAlign:'justify', marginTop: 'auto', paddingTop: '12rem', display:'block', maxWidth: 'auto'}}>
                            {props.caption}
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


function PhotoCardRight(props) {
    return(
    <div>
    <Container fluid key={props.id} >
        <Row md={1} lg={1}>
            <Col sm={12} md={12} lg={6}>
                <p style={{textAlign:'justify', marginTop: 'auto', paddingTop: '12rem', display:'block', maxWidth: 'auto'}}>
                    {props.caption}
                </p>
            </Col>
            <Col sm={12} md={12} lg={6}>
                <img style={{height:'600px', width:'600px'}} src={props.image} alt={props.altText}/>
            </Col>
            
        </Row>
    </Container>
</div>
    )
}

export {PhotoCard, PhotoCardRight}



import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import StockDataResponse from './model/StockDataResponse'
import NetworkService from './service/NetworkService'
import INetworkRequest from './service/INetworkRequest';
import { StockAPI } from './api/StockAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Form, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

const App = () => {
  const BASE_URL = 'https://jsonmock.hackerrank.com/api/'
  const [stockDataResponse, setStockDataResponse] = useState<StockDataResponse>()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const inputDate = useRef<HTMLInputElement>(null)

  const getStocks = async (date: string) => {
    const getStockDataParams: INetworkRequest = {
      httpMethod: 'get',
      params: {}
    }
    const url = `${BASE_URL}${StockAPI.getStock}${date}`
    const response = await NetworkService.instance.request(url, getStockDataParams)
    const stockDataResponse = response.data as StockDataResponse
    setStockDataResponse(stockDataResponse)
    if (stockDataResponse.data.length > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const clickSearch = (event: MouseEvent<HTMLButtonElement>) => {
    if (inputDate != null) {
      const date = inputDate?.current?.value as string
      if (date === "") {
        setIsVisible(false)
      }
      console.log({ date })
      getStocks(date)
    }
    event.preventDefault()
  }

  useEffect(() => {

  }, [isVisible])

  return (
    <Container style={{ marginTop: "16px" }} fluid>
      <Row>
        <Col>
          <Form style={{ marginLeft: "500px", width: '100%' }}>
            <InputGroup style={{ width: "30%" }}>
              <FormControl placeholder="e.g., 5-January-2000" id="date" style={{ marginRight: "8px" }} ref={inputDate} />
              <Button title="Search" style={{ color: 'white', backgroundColor: 'green' }} onClick={(e) => clickSearch(e)}>Search</Button>
            </InputGroup>
          </Form>
        </Col>
        <Row>
          <h5 style={{ textAlign: 'center', marginTop: "16px", visibility: isVisible ? 'hidden' : 'visible'}}>Data Not Found</h5>
          <ListGroup as="ul" style={{width: '60%', marginLeft: '300px', visibility: isVisible ? 'visible' : 'hidden'}}>
            <>
              {stockDataResponse?.data.map((stock, index) => {
                return (
                  <>
                    <ListGroup.Item as="li">
                      {`Open: ${stock.open}`}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                      {`Close: ${stock.close}`}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                      {`High: ${stock.high}`}
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                      {`Low: ${stock.low}`}
                    </ListGroup.Item>
                  </>
                )
              })}
            </>
          </ListGroup>
        </Row>
      </Row>

    </Container>
  );
}

export default App;

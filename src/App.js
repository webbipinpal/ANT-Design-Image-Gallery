import React, {useEffect, useState} from 'react';
import './App.css';
import { Card, Image, Input, List, Space, Typography } from 'antd';

function App() {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
    .then(res => res.json())
    .then(res => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, [searchText]);

  return (
    <div className="App">
      <Space direction='vertical'>
      <Typography.Title>Image Gallery</Typography.Title>
      <Typography.Text>Showing products searchd by: {searchText || 'All'} </Typography.Text>
      <Input.Search style={{width: '100%', maxWidth: 500}} placeholder='Search products' onSearch={(value) => setSearchText(value)} />

      <List 
      loading={loading}
      dataSource={dataSource} 
      grid={{xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6}}
      renderItem={(item) => {
          return <Card 
                  key={item.id}
                  style={{margin: 12}}
                  hoverable
                  >
                <Image src={item.thumbnail} preview={false} onClick={() => {
                  setPreviewImages(item.images)
                }}/>
                </Card>
      }} />
      {
        previewImages.length > 0 ? <Image.PreviewGroup preview={{visible: previewImages.length > 0, onVisibleChange: (value) => {
          if(!value){
            setPreviewImages([]);
          }
        }}}>
          {previewImages.map((image) => {
            return <Image src={image} />
          })}
        </Image.PreviewGroup> : null
      }
      </Space>
    </div>
  );
}

export default App;

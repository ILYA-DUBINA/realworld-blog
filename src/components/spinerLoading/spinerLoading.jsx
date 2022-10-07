import React from 'react';
import { Alert, Spin } from 'antd';

import './spinerLoading.css';
import 'antd/dist/antd.min.css';

export const SpinerLoading = () => (
  <div className="example">
    <Spin tip="Loading...">
      <Alert message="Alert message title" description="Further details about the context of this alert." type="info" />
    </Spin>
  </div>
);
export const SpinerLoadingImage = () => (
  <div className="example">
    <Spin tip="The image is loading... or the image is not">
      <Alert message="Alert..." description="Further..." type="info" />
    </Spin>
  </div>
);

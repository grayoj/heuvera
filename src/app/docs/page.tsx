'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerDocs() {
  return (
    <div className="h-screen">
      <SwaggerUI url="/swagger.json" />
    </div>
  );
}

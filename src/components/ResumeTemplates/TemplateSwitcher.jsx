import React from 'react';
import { ModernTemplate } from './ModernTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { CompactTemplate } from './CompactTemplate';

export const TemplateSwitcher = ({ data }) => {
  const templateId = data.customization?.template || 'modern';

  switch (templateId) {
    case 'executive':
      return <ExecutiveTemplate data={data} />;
    case 'minimalist':
      return <MinimalistTemplate data={data} />;
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'compact':
      return <CompactTemplate data={data} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} />;
  }
};

// import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'react-router-dom';
import ApiAlert from '../ApiAlert/ApiAlert';
import { DashboardHeading } from '../../ui';

type Props = {
  entityName: string;
  entityIdName: string;
};

export const ApiList = ({ entityName, entityIdName }: Props) => {
  const params = useParams();
  const origin = ''; // useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <DashboardHeading title="API" description="API Calls for Categories" />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

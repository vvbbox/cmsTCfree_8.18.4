import { useRouteError } from 'react-router-dom';
import {Helmet} from "react-helmet";

function PageNotFound1() {
	const error = useRouteError();
  
	if (isRouteErrorResponse(error)) {
	  if (error.status === 404) {
		return( 
		<div><Helmet>
        <title>error 404</title>
        <meta property="robots" content="noindex" data-react-helmet="true" />
        </Helmet><h1>This page doesn't exist!</h1>
		</div>);
	  }
  
	  if (error.status === 401) {
		return ( 
			<div><Helmet>
			<title>error 401</title>
			<meta property="robots" content="noindex" data-react-helmet="true" />
			</Helmet><h1>You aren't authorized to see this</h1></div>);
	  }
  
	  if (error.status === 503) {
		return ( 
			<div><Helmet>
			<title>error 503</title>
			<meta property="robots" content="noindex" data-react-helmet="true" />
			</Helmet><h1>Looks like our API is down</h1></div>);
	  }
  
	  if (error.status === 418) {
		return ( 
			<div><Helmet>
			<title>error 418</title>
			<meta property="robots" content="noindex" data-react-helmet="true" />
			</Helmet><h1>🫖</h1></div>);
	  }
	}
  
	return <div>Something went wrong</div>;
  }

function PageNotFound() {
	//const error = useRouteError();
	//console.error("404 Not Found Error");


return (
	<div>
	<div className='container'>
		    <Helmet>
        <title>Error 404</title>
        <meta property="robots" content="noindex" data-react-helmet="true" />
		</Helmet>
		<div className="row px-4">
			<div className="col-2"></div>
			<div className="col-8">
				<br />
				<div className="card text-black border-success bg-transparent text-center" >
					<div className="card-header text-black text-center ">
						<h1>Hi! It is an Error Page</h1>
					</div>
					<h2 style={{ color: "red" }} > 404 Not Found Error</h2>
				</div>
			</div>
		</div>
	</div>
	
	</div>
);
}
export default PageNotFound;

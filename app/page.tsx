import CreateActivityForm from './create-activity-form';

const Page = () => {
	return (
		<main className="relative flex min-h-screen flex-col bg-blue-50/50">
			<h1>Attendnt</h1>
			<section className="p-2">
				<h2>
					A simple, generic and easy tool to track attendance for any purpose.
				</h2>
				<CreateActivityForm />
			</section>
		</main>
	);
};

export default Page;

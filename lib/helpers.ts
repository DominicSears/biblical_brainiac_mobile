import { api } from "./axios";

export const get = async (url: string): Promise<{data: any, status: number}> => {
	let data, status;

	try {
		const res = await api().get(url);

		data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
		status = res.status;
	} catch (e: any) {
		console.log('e:',e);
		
		data = e?.response?.data ?? {};
		status = e?.response?.status ?? 500;
	}

	return { data, status };
}

export const post = async (url: string, postData?: any | undefined): Promise<{data: any, status: number}> => {
	let data, status;

	try {
		const res = await api().post(
			url,
			postData === undefined ? undefined : JSON.stringify(postData)
		);

		data = res.data;
		status = res.status;
	} catch (e: any) {
		console.error('postError:', {
			stack: e.stack ?? '',
			e
		});
		

		data = e?.response?.data ?? {};
		status = e?.response?.status ?? 500;
	}

	return { data, status };
}

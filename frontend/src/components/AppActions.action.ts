import {
	ModalSelectType,
	MyConnectionResponseModel,
	MyConnectionTransformedRequestModel,
	MyFutureApplicationResponseModel,
	MyFutureApplicationTransformedRequestModel,
	MyJobResponseModel,
	MyJobTransformedRequestModel,
	PoolCreationResponseModel,
} from "../models/types.ts";
import {connectionInstance, jobInstance, toApplyInstance} from "../api/axiosInstances.ts";

// TODO: Type checking

export class JobActions {
	static postMyNewJob = async (
		data: MyJobTransformedRequestModel
	): Promise<MyJobResponseModel> => {
		const response = await jobInstance.post<MyJobResponseModel>("", data);
		return response.data;
	}

	static changeMyJobStatus = async (
		jobId: string,
		status: ModalSelectType,
	): Promise<MyJobResponseModel> => {
		const response = await jobInstance.put<MyJobResponseModel>(`/${jobId}`, status);
		return response.data;
	}

	static handleNote = async (
		jobId: string,
		note: string | null = null,
	): Promise<MyJobResponseModel> => {
		const response = await jobInstance.put<MyJobResponseModel>(`/${jobId}/note`, {note});
		return response.data;
	}

	static deleteMyJob = async (
		jobId: string,
	) => {
		const response = await jobInstance.delete(`/${jobId}`);
		return response.data;
	}

	static getAllMyJobs = async (
		userId: string,
	): Promise<MyJobResponseModel[]> => {
		const response = await jobInstance.get<MyJobResponseModel[]>(`/${userId}`);
		return response.data;
	}
}

export class ConnectionActions {
	static postMyConnection = async (
		data: MyConnectionTransformedRequestModel
	): Promise<MyConnectionResponseModel> => {
		const response = await connectionInstance.post<MyConnectionResponseModel>("", data);
		return response.data;
	}

	static handleNote = async (
		connectionId: string,
		note: string | null = null,
	): Promise<PoolCreationResponseModel> => {
		const response = await connectionInstance.put<PoolCreationResponseModel>(`/${connectionId}/note`, {note});
		return response.data;
	}

	static deleteMyConnection = async (
		connectionId: string,
	) => {
		const response = await connectionInstance.delete(`/${connectionId}`);
		return response.data;
	}

	static getAllMyConnections = async (
		userId: string,
	): Promise<MyConnectionResponseModel[]> => {
		const response = await connectionInstance.get<MyConnectionResponseModel[]>(`/${userId}`);
		return response.data;
	}
}

export class ToApplyActions {
	static postMyToApply = async (
		data: MyFutureApplicationTransformedRequestModel
	): Promise<MyFutureApplicationResponseModel> => {
		const response = await toApplyInstance.post<MyFutureApplicationResponseModel>("", data);
		return response.data;
	}

	static handleNote = async (
		applicationId: string,
		note: string | null = null,
	): Promise<MyFutureApplicationResponseModel> => {
		const response = await toApplyInstance.put<MyFutureApplicationResponseModel>(`/${applicationId}/note`, {note});
		return response.data;
	}

	static deleteMyToApply = async (
		applicationId: string,
	) => {
		const response = await toApplyInstance.delete(`/${applicationId}`);
		return response.data;
	}

	static getAllMyFutureApplications = async (
		userId: string,
	): Promise<MyFutureApplicationResponseModel[]> => {
		const response = await toApplyInstance.get<MyFutureApplicationResponseModel[]>(`/${userId}`);
		return response.data;
	}
}
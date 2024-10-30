import {
	AllJobListingsResponseModel,
	AllPoolListingsResponseModel,
	JobCreationResponseModel,
	JobDeletionResponseModel,
	ModalSelectType,
	PoolCreationResponseModel,
	TransformedAddEditJobProps,
	TransformedAddEditPoolType
} from "../models/componentsTypes.ts";
import {jobInstance} from "../api/axiosInstances.ts";

export class JobActions {
	static postNewJobListing = async (
		data: TransformedAddEditJobProps
	): Promise<JobCreationResponseModel> => {
		const response = await jobInstance.post<JobCreationResponseModel>("/jobListings/newListing", data);
		return response.data;
	}

	static getAllJobListings = async (
		userId: string,
	): Promise<AllJobListingsResponseModel[]> => {
		const response = await jobInstance.get<AllJobListingsResponseModel[]>(`/jobListings/all/${userId}`);
		return response.data;
	}

	static changeJobStatus = async (
		jobId: string,
		status: ModalSelectType,
	): Promise<JobCreationResponseModel> => {
		const response = await jobInstance.put<JobCreationResponseModel>(`/jobListings/${jobId}/status`, status);
		return response.data;
	}

	static deleteJobListing = async (
		jobId: string,
	): Promise<JobDeletionResponseModel> => {
		const response = await jobInstance.delete<JobDeletionResponseModel>(`/jobListings/${jobId}`);
		return response.data;
	}
}

export class PoolActions {
	static postNewPoolListing = async (
		data: TransformedAddEditPoolType
	): Promise<PoolCreationResponseModel> => {
		const response = await jobInstance.post<PoolCreationResponseModel>("/poolListings/newListing", data);
		return response.data;
	}

	static getAllPoolListings = async (
		userId: string,
	): Promise<AllPoolListingsResponseModel[]> => {
		const response = await jobInstance.get<AllPoolListingsResponseModel[]>(`/poolListings/all/${userId}`);
		return response.data;
	}

	static deletePoolListing = async (
		poolId: string,
	) => {
		const response = await jobInstance.delete(`/poolListings/${poolId}`);
		return response.data;
	}
}
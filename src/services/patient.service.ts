import { PrismaClient, Prisma, Patient  } from '../generated/prisma/client';

export type PrismaTx = PrismaClient | Prisma.TransactionClient;
const getClient = (tx?: PrismaTx) => tx ?? prisma;
import prisma from '../client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const createPatient = async <Key extends keyof Patient>(
    bodyParam: any,
    tx?: PrismaTx
): Promise<Pick<Patient, Key>> => {
    const Patient = await getClient(tx).patient.create({
        data: bodyParam
    });

    return Patient;
};

const updatePatientById = async <Key extends keyof Patient>(
    PatientId: string,
    updateBody: Prisma.PatientUpdateInput,
    tx?: PrismaTx
): Promise<Pick<Patient, Key>> => {
    const Patient = await getPatientById(PatientId, tx);
    if (!Patient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient  not found');
    }
    if (Patient.deleted) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Patient  has been deleted.');
    }
    const UpdatedPatient = await getClient(tx).patient.update({
        where: { id: Patient.id },
        data: updateBody
    });
    return UpdatedPatient as Pick<Patient, Key>;
};

const getPatientById = async (id: string, tx?: PrismaTx): Promise<Patient | null> => {
    return getClient(tx).patient.findUnique({
        where: { id },
    }) as Promise<Patient | null>;
};

const getPatientByObj = async (filter: object, tx?: PrismaTx): Promise<Patient> => {
    const Patient = await getClient(tx).patient.findFirst({
        where: filter,
    });
    return Patient as Patient;
};

const deletePatientById = async <Key extends keyof Patient>(
    PatientId: string,
    tx?: PrismaTx
): Promise<Pick<Patient, Key>> => {
    const Patient = await getPatientById(PatientId, tx);
    if (!Patient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient  not found');
    }
    const data = await getClient(tx).patient.delete({
        where: { id: Patient.id },
    });
    return data 
}

const queryPatient = async (
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
     tx?: PrismaTx
): Promise<Patient[]> => {
    const page = (options.page ?? 1) - 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const Patients = await getClient(tx).patient.findMany({
        where: filter,
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
    });
    return Patients as Patient[];
};

const queryPatientNoPagination = async (filter: object, tx?: PrismaTx): Promise<Patient[]> => {
    const Patient = await getClient(tx).patient.findMany({
        where: filter
    });
    return Patient as Patient[];
};

const countPatient = async (filter: object, tx?: PrismaTx): Promise<number> => {
    const count = await getClient(tx).patient.count({
        where: { ...filter }
    });
    return count;
};

const createMany = async <Key extends keyof Patient>(
    bodyParam: any,
    tx?: PrismaTx
): Promise<Pick<Patient, Key>> => {
    const data = await getClient(tx).patient.createMany({
        data: bodyParam
    });

    return data as unknown as Promise<Pick<Patient, Key>>;
};

const updateMany = async <Key extends keyof Patient>(
    dataId: object,
    updateBody: any,
    tx?: PrismaTx
): Promise<Pick<Patient, Key>> => {
    const updatedData = await getClient(tx).patient.updateMany({
        where: dataId,
        data: updateBody
    });
    return updatedData as unknown as Pick<Patient, Key>;
};

export default {
    createPatient,
    getPatientById,
    getPatientByObj,
    deletePatientById,
    queryPatient,
    updatePatientById,
    queryPatientNoPagination,
    countPatient,
    createMany,
    updateMany
};

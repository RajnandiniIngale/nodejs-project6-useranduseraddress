import { PrismaClient, UserAddress } from "@prisma/client";

const prisma = new PrismaClient();

const userResolver = {

    getUsers : async () => await prisma.user.findMany({
        where: {
            //deleted: false
            deletedAt: null
        }
    }),


    getUser : async ({id}: {id:string}) => await prisma.user.findUnique({
        where: {
            id : parseInt(id),
            //deleted: false
            deletedAt : null
        }
    }),


    createUser :async ({name,email}:{name:string,email:string}) => await prisma.user.create({
        data:{
            name,
            email
        }

    }),

    updateUser : async ({id,name,email} : {id: string,name?: string,email?: string} ) => 
    await prisma.user.update({
        where:
        {
            id: parseInt(id)
        },
        data:{
            name,
            email
        }
    }),


    deleteUser : async ({id} : {id: string}) => await prisma.user.update({
        where:
        {
            id: parseInt(id),
        },
        data:{
            deletedAt: new Date()
        }
    }),


    getAddressById : async ({id}: {id: string}) : Promise<UserAddress|null> =>{
        const address = await prisma.userAddress.findUnique({
            where: {
                id: parseInt(id),
                //deleted: false
                deletedAt: null
            },
            include:{
                user:true
            }
        })

        return address;
    },


    getAddressesByUserId : async ({userId}: {userId: string}) : Promise<UserAddress[] | null> =>{
        const address = await prisma.userAddress.findMany({
                where: {
                    userId : parseInt(userId),
                    //deleted: false
                    deletedAt : null
                },
                include: {
                    user: true
                }
        })

        return address;
    },



    getAllAddresses : async (): Promise<UserAddress[]> => {
        const allAddress = await prisma.userAddress.findMany({
            include:{
                user: true
            },
            where:{
                //deleted: false
                deletedAt: null
            }
        }
        );

        return allAddress;
    },


    createUserAddress : async ({userId,address}: any) : Promise<UserAddress> =>{
        const createdAddress = await prisma.userAddress.create({
            data: {
                ...address,
                userId: parseInt(userId)
            },
            include:{
                user: true
            }
        })

        return createdAddress;
    },

    deleteUserAddressByAddressId: async ({ id }: { id: string }) => {
        const deletedAddress = await prisma.userAddress.update({
          where: {
            id: parseInt(id),
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
          },
          include: {
            user: true,
          },
        });
    
        return deletedAddress;
      },

    

    deleteUserAddressesByUserId: async ({ userId }: { userId: string }): Promise<UserAddress[]> => {
        const deletedAddresses = await prisma.userAddress.findMany({
          where: {
            userId: parseInt(userId),
            deletedAt: null,
          },
          include: {
            user: true,
          },
        });
    
        if (deletedAddresses.length > 0) {
          await prisma.userAddress.updateMany({
            where: {
              userId: parseInt(userId),
              deletedAt: null,
            },
            data: {
              deletedAt: new Date(),
            },
          });
        }
    
        return deletedAddresses;
      },
    };


export default userResolver;
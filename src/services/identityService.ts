export interface VerificationStatus {
  isConnected: boolean;
  providerName: string;
  statusMessage: string;
}

export class IdentityVerificationService {
  /**
   * Swedish BankID verification abstraction interface.
   * BankID requires official agreement, certificate setup, and server-side RPC with Finansiell ID-Teknik BID AB.
   */
  static getBankIDStatus(): VerificationStatus {
    return {
      isConnected: false,
      providerName: 'Swedish BankID',
      statusMessage: 'BankID — Ej ansluten (Prepared interface)',
    };
  }

  static initiateBankIDAuth(_personnummer?: string): Promise<{ success: boolean; message: string }> {
    return Promise.resolve({
      success: false,
      message: 'BankID — Ej ansluten. Interfacet är förberett för framtida BankID-integration.',
    });
  }
}

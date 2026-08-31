export type UserRole = 'farmer' | 'buyer' | 'logistics' | 'admin';
export type Language = 'en' | 'si' | 'ta';

export type QualityGrade = 'Grade A' | 'Grade B' | 'Grade C';

export interface ProduceListing {
  id: string;
  title: string;
  cropType: string;
  grade: QualityGrade;
  quantityKg: number;
  pricePerKg: number;
  totalValueLkr: number;
  harvestDate: string;
  locationDistrict: string;
  locationHub: string;
  farmerName: string;
  farmerId: string;
  farmerNic: string;
  farmerPhone: string;
  isPreHarvest: boolean;
  photos: string[];
  organicCertified: boolean;
  moistureContent: string;
  minOrderQtyKg: number;
  description: string;
  status: 'active' | 'negotiating' | 'contracted' | 'sold';
}

export interface OfferMessage {
  id: string;
  sender: 'buyer' | 'farmer';
  senderName: string;
  offeredPricePerKg: number;
  quantityKg: number;
  note: string;
  timestamp: string;
}

export interface NegotiationOffer {
  id: string;
  listingId: string;
  produceTitle: string;
  cropType: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  farmerId: string;
  farmerName: string;
  targetQtyKg: number;
  originalPricePerKg: number;
  offeredPricePerKg: number;
  proposedDeliveryDate: string;
  status: 'pending' | 'countered' | 'accepted' | 'rejected' | 'escrowed';
  messages: OfferMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface EscrowContract {
  id: string;
  negotiationId: string;
  listingId: string;
  buyerName: string;
  buyerCompany: string;
  farmerName: string;
  produceTitle: string;
  quantityKg: number;
  agreedPricePerKg: number;
  produceAmountLkr: number;
  escrowFeeLkr: number;
  transportFeeLkr: number;
  totalPaidLkr: number;
  status: 'holding' | 'disputed' | 'released' | 'refunded';
  invoiceNumber: string;
  paymentMethod: string;
  depositDate: string;
  qrVerificationCode: string;
  deliveryAddress: string;
  haulerName?: string;
  haulerStatus?: 'pending' | 'assigned' | 'in_transit' | 'delivered';
}

export interface RouteCheckpoint {
  name: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
}

export interface ShipmentJob {
  id: string;
  contractId: string;
  produceTitle: string;
  originDistrict: string;
  originHub: string;
  destinationDistrict: string;
  destinationHub: string;
  weightKg: number;
  haulerName: string;
  haulerVehicle: string;
  driverName: string;
  driverPhone: string;
  payoutLkr: number;
  status: 'available' | 'assigned' | 'in_transit' | 'delivered';
  currentLocationName: string;
  estimatedArrival: string;
  checkpoints: RouteCheckpoint[];
  qrSignatureVerified: boolean;
  verifiedAt?: string;
}

export interface MarketPriceIndicator {
  id: string;
  cropName: string;
  cropNameSi: string;
  cropNameTa: string;
  centerName: 'Dambulla' | 'Pettah' | 'Keppetipola' | 'Meegoda';
  minPriceLkr: number;
  maxPriceLkr: number;
  avgPriceLkr: number;
  change24h: number;
  unit: string;
  updatedAt: string;
}

export interface DisputeTicket {
  id: string;
  contractId: string;
  raisedBy: string;
  role: 'buyer' | 'farmer';
  reason: string;
  evidenceNotes: string;
  status: 'open' | 'under_review' | 'resolved';
  resolutionOutcome?: string;
  refundPercentage?: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  nicOrBrn: string;
  phone: string;
  district: string;
  bankAccount: {
    bankName: string;
    accountNumber: string;
    branchName: string;
    verified?: boolean;
  };
  nicVerified?: boolean;
  bankVerified?: boolean;
  verified: boolean;
}

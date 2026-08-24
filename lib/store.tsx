'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  ProduceListing,
  NegotiationOffer,
  EscrowContract,
  ShipmentJob,
  MarketPriceIndicator,
  DisputeTicket,
  UserProfile,
} from './types';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  listings: ProduceListing[];
  addListing: (listing: Omit<ProduceListing, 'id' | 'status' | 'farmerId' | 'totalValueLkr'>) => void;
  offers: NegotiationOffer[];
  createOffer: (listingId: string, targetQtyKg: number, offeredPricePerKg: number, deliveryDate: string, note: string) => void;
  respondToOffer: (offerId: string, action: 'accept' | 'reject' | 'counter', counterPrice?: number, counterQty?: number, note?: string) => void;
  contracts: EscrowContract[];
  depositEscrow: (contractId: string) => void;
  shipments: ShipmentJob[];
  updateShipmentStatus: (shipmentId: string, status: ShipmentJob['status'], locationName?: string) => void;
  verifyDeliveryQr: (shipmentId: string) => void;
  marketPrices: MarketPriceIndicator[];
  updateMarketPrice: (id: string, avgPriceLkr: number) => void;
  disputes: DisputeTicket[];
  raiseDispute: (contractId: string, reason: string, evidence: string) => void;
  resolveDispute: (disputeId: string, outcome: string, refundPct: number) => void;
  currentUser: UserProfile;
}

const initialMarketPrices: MarketPriceIndicator[] = [
  { id: 'mp-1', cropName: 'Premium Leeks', cropNameSi: 'ලීක්ස්', cropNameTa: 'லீக்ஸ்', centerName: 'Dambulla', minPriceLkr: 125, maxPriceLkr: 145, avgPriceLkr: 135, change24h: 3.8, unit: 'Kg', updatedAt: 'Today 06:00 AM' },
  { id: 'mp-2', cropName: 'Washed Carrots', cropNameSi: 'කැරට්', cropNameTa: 'கேரட்', centerName: 'Dambulla', minPriceLkr: 88, maxPriceLkr: 105, avgPriceLkr: 95, change24h: -1.2, unit: 'Kg', updatedAt: 'Today 06:00 AM' },
  { id: 'mp-3', cropName: 'Green Chili', cropNameSi: 'අමු මිරිස්', cropNameTa: 'பச்சை மிளகாய்', centerName: 'Pettah', minPriceLkr: 300, maxPriceLkr: 350, avgPriceLkr: 320, change24h: 6.5, unit: 'Kg', updatedAt: 'Today 06:30 AM' },
  { id: 'mp-4', cropName: 'Keeri Samba Paddy', cropNameSi: 'කීරි සම්බා වී', cropNameTa: 'கீரி சம்பா நெல்', centerName: 'Keppetipola', minPriceLkr: 138, maxPriceLkr: 152, avgPriceLkr: 145, change24h: 1.5, unit: 'Kg', updatedAt: 'Today 05:45 AM' },
  { id: 'mp-5', cropName: 'Jaffna Red Onions', cropNameSi: 'රතු ලූණු', cropNameTa: 'சின்ன வெங்காயம்', centerName: 'Meegoda', minPriceLkr: 260, maxPriceLkr: 295, avgPriceLkr: 280, change24h: 0.0, unit: 'Kg', updatedAt: 'Today 07:00 AM' },
  { id: 'mp-6', cropName: 'Ripe Tomatoes', cropNameSi: 'තක්කාලි', cropNameTa: 'தக்காளி', centerName: 'Dambulla', minPriceLkr: 100, maxPriceLkr: 120, avgPriceLkr: 110, change24h: -4.2, unit: 'Kg', updatedAt: 'Today 06:15 AM' },
];

const initialListings: ProduceListing[] = [
  {
    id: 'list-101',
    title: 'Export Grade Leeks',
    cropType: 'Leeks',
    grade: 'Grade A',
    quantityKg: 2500,
    pricePerKg: 135,
    totalValueLkr: 337500,
    harvestDate: '2026-08-28',
    locationDistrict: 'Nuwara Eliya',
    locationHub: 'Nuwara Eliya Central Hub',
    farmerName: 'Bandara Organic Farms',
    farmerId: 'farmer-01',
    farmerNic: '781920394V',
    farmerPhone: '+94 77 123 4567',
    isPreHarvest: false,
    photos: ['https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&auto=format&fit=crop&q=80'],
    organicCertified: true,
    moistureContent: '12% Optimal',
    minOrderQtyKg: 500,
    description: 'Crisp, washed Nuwara Eliya highland leeks. Grown with strict GAP standards, suitable for supermarket distribution & export.',
    status: 'active',
  },
  {
    id: 'list-102',
    title: 'Washed Orange Carrots',
    cropType: 'Carrots',
    grade: 'Grade A',
    quantityKg: 4500,
    pricePerKg: 95,
    totalValueLkr: 427500,
    harvestDate: '2026-08-30',
    locationDistrict: 'Badulla',
    locationHub: 'Keppetipola Economic Center',
    farmerName: 'Dambulla Produce Central',
    farmerId: 'farmer-02',
    farmerNic: '840192837V',
    farmerPhone: '+94 71 987 6543',
    isPreHarvest: true,
    photos: ['https://images.unsplash.com/photo-1447175008436-0841719b8b80?w=600&auto=format&fit=crop&q=80'],
    organicCertified: false,
    moistureContent: '14% Fresh',
    minOrderQtyKg: 1000,
    description: 'Pre-harvest forward booking available for high-density washed carrots. Estimated yield ready in 5 days.',
    status: 'active',
  },
  {
    id: 'list-103',
    title: 'Keeri Samba Paddy (Advance Yield)',
    cropType: 'Paddy',
    grade: 'Grade A',
    quantityKg: 12000,
    pricePerKg: 145,
    totalValueLkr: 1740000,
    harvestDate: '2026-09-15',
    locationDistrict: 'Polonnaruwa',
    locationHub: 'Polonnaruwa Paddy Hub',
    farmerName: 'Rajarata Farmers Guild',
    farmerId: 'farmer-03',
    farmerNic: '692810394V',
    farmerPhone: '+94 76 555 1212',
    isPreHarvest: true,
    photos: ['https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&auto=format&fit=crop&q=80'],
    organicCertified: true,
    moistureContent: '11% Dry Harvest',
    minOrderQtyKg: 2000,
    description: 'Forward contract listing for upcoming Keeri Samba harvest. Lock in wholesale mill prices today with 20% escrow deposit.',
    status: 'active',
  },
  {
    id: 'list-104',
    title: 'Spicy Green Chili (Grade A)',
    cropType: 'Green Chili',
    grade: 'Grade A',
    quantityKg: 1800,
    pricePerKg: 320,
    totalValueLkr: 576000,
    harvestDate: '2026-08-25',
    locationDistrict: 'Monaragala',
    locationHub: 'Dambulla Central Market',
    farmerName: 'Wellawaya Agri Co-op',
    farmerId: 'farmer-04',
    farmerNic: '891029384V',
    farmerPhone: '+94 70 333 4455',
    isPreHarvest: false,
    photos: ['https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80'],
    organicCertified: false,
    moistureContent: 'Standard',
    minOrderQtyKg: 250,
    description: 'Freshly plucked dark green chili with high heat index. Packed in 25kg ventilated jute bags for immediate haulage.',
    status: 'active',
  },
  {
    id: 'list-105',
    title: 'Jaffna Premium Red Onions',
    cropType: 'Red Onion',
    grade: 'Grade A',
    quantityKg: 3500,
    pricePerKg: 280,
    totalValueLkr: 980000,
    harvestDate: '2026-08-26',
    locationDistrict: 'Jaffna',
    locationHub: 'Chavakachcheri Market',
    farmerName: 'Northern Produce Co.',
    farmerId: 'farmer-05',
    farmerNic: '912039485V',
    farmerPhone: '+94 77 444 8899',
    isPreHarvest: false,
    photos: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=600&auto=format&fit=crop&q=80'],
    organicCertified: true,
    moistureContent: 'Sun Cured',
    minOrderQtyKg: 500,
    description: 'Famous Jaffna small red shallot onions, sun-dried for long shelf life. Excellent bulb density.',
    status: 'active',
  }
];

const initialOffers: NegotiationOffer[] = [
  {
    id: 'off-501',
    listingId: 'list-101',
    produceTitle: 'Export Grade Leeks',
    cropType: 'Leeks',
    buyerId: 'buyer-01',
    buyerName: 'Keells Agri Procure',
    buyerCompany: 'Jaykay Marketing Services PLC',
    buyerPhone: '+94 11 234 5678',
    farmerId: 'farmer-01',
    farmerName: 'Bandara Organic Farms',
    targetQtyKg: 1500,
    originalPricePerKg: 135,
    offeredPricePerKg: 128,
    proposedDeliveryDate: '2026-08-29',
    status: 'countered',
    messages: [
      { id: 'm1', sender: 'buyer', senderName: 'Keells Agri Procure', offeredPricePerKg: 125, quantityKg: 1500, note: 'We request 1,500kg at LKR 125/kg for central supermarket warehouse delivery.', timestamp: '2026-08-24 08:15 AM' },
      { id: 'm2', sender: 'farmer', senderName: 'Bandara Organic Farms', offeredPricePerKg: 128, quantityKg: 1500, note: 'We can lower to LKR 128/kg if transport loading is handled before 10 AM.', timestamp: '2026-08-24 08:45 AM' },
    ],
    createdAt: '2026-08-24 08:15 AM',
    updatedAt: '2026-08-24 08:45 AM',
  },
  {
    id: 'off-502',
    listingId: 'list-102',
    produceTitle: 'Washed Orange Carrots',
    cropType: 'Carrots',
    buyerId: 'buyer-02',
    buyerName: 'Cargills Food City B2B',
    buyerCompany: 'Cargills Ceylon PLC',
    buyerPhone: '+94 11 987 1122',
    farmerId: 'farmer-02',
    farmerName: 'Dambulla Produce Central',
    targetQtyKg: 2000,
    originalPricePerKg: 95,
    offeredPricePerKg: 95,
    proposedDeliveryDate: '2026-08-31',
    status: 'accepted',
    messages: [
      { id: 'm3', sender: 'buyer', senderName: 'Cargills Food City B2B', offeredPricePerKg: 95, quantityKg: 2000, note: 'Accepting baseline price LKR 95/kg for 2 metric tons advance harvest booking.', timestamp: '2026-08-24 09:00 AM' },
    ],
    createdAt: '2026-08-24 09:00 AM',
    updatedAt: '2026-08-24 09:05 AM',
  }
];

const initialContracts: EscrowContract[] = [
  {
    id: 'ctr-701',
    negotiationId: 'off-502',
    listingId: 'list-102',
    buyerName: 'Cargills Food City B2B',
    buyerCompany: 'Cargills Ceylon PLC',
    farmerName: 'Dambulla Produce Central',
    produceTitle: 'Washed Orange Carrots (2,000 Kg)',
    quantityKg: 2000,
    agreedPricePerKg: 95,
    produceAmountLkr: 190000,
    escrowFeeLkr: 2850,
    transportFeeLkr: 15000,
    totalPaidLkr: 207850,
    status: 'holding',
    invoiceNumber: 'INV-KP-2026-0892',
    paymentMethod: 'Escrow Digital Guarantee',
    depositDate: '2026-08-24 09:10 AM',
    qrVerificationCode: 'KP-QR-9823-CARROT-2000',
    deliveryAddress: 'Cargills Distribution Center, Welisara, Western Province',
    haulerName: 'Lanka Logistics Express',
    haulerStatus: 'in_transit',
  }
];

const initialShipments: ShipmentJob[] = [
  {
    id: 'ship-901',
    contractId: 'ctr-701',
    produceTitle: 'Washed Orange Carrots (2,000 Kg)',
    originDistrict: 'Badulla',
    originHub: 'Keppetipola Economic Center',
    destinationDistrict: 'Colombo',
    destinationHub: 'Welisara Distribution Hub',
    weightKg: 2000,
    haulerName: 'Lanka Logistics Express',
    haulerVehicle: 'Refrigerated Truck (WP LE-4821)',
    driverName: 'Nimal Silva',
    driverPhone: '+94 71 444 5566',
    payoutLkr: 15000,
    status: 'in_transit',
    currentLocationName: 'Kegalle Checkpoint (Colombo-Kandy Road)',
    estimatedArrival: 'Today, 04:30 PM',
    checkpoints: [
      { name: 'Dispatched from Keppetipola Hub', time: '08:00 AM', status: 'completed' },
      { name: 'Kandy Transit Hub Clearance', time: '11:15 AM', status: 'completed' },
      { name: 'Kegalle Highway Checkpoint', time: '01:45 PM', status: 'current' },
      { name: 'Welisara B2B Hub Drop-off', time: '04:30 PM (ETA)', status: 'pending' },
    ],
    qrSignatureVerified: false,
  },
  {
    id: 'ship-902',
    contractId: 'ctr-700-demo',
    produceTitle: 'Spicy Green Chili (1,000 Kg)',
    originDistrict: 'Monaragala',
    originHub: 'Wellawaya Hub',
    destinationDistrict: 'Colombo',
    destinationHub: 'Pettah Wholesale Market',
    weightKg: 1000,
    haulerName: 'Islandwide Freight Service',
    haulerVehicle: '3-Ton Hauler (CP GA-1920)',
    driverName: 'Kamal Perera',
    driverPhone: '+94 77 888 9900',
    payoutLkr: 18000,
    status: 'available',
    currentLocationName: 'Awaiting Transporter Acceptance',
    estimatedArrival: 'Tomorrow, 10:00 AM',
    checkpoints: [
      { name: 'Cargo Ready at Wellawaya Hub', time: '07:00 AM', status: 'completed' },
      { name: 'Transporter Dispatch', time: 'Pending', status: 'pending' },
      { name: 'Pettah Hub Inspection', time: 'Pending', status: 'pending' },
    ],
    qrSignatureVerified: false,
  }
];

const initialDisputes: DisputeTicket[] = [
  {
    id: 'disp-01',
    contractId: 'ctr-699-old',
    raisedBy: 'Keells Agri Procure',
    role: 'buyer',
    reason: 'Grade A Tomatoes down-graded to Grade B due to transit bruising.',
    evidenceNotes: 'Photos uploaded showing 15% crushed tomatoes in bottom crates during unloading at Pettah.',
    status: 'under_review',
    createdAt: '2026-08-23',
  }
];

const initialUser: UserProfile = {
  id: 'usr-001',
  name: 'Deshan Siriwardhna',
  role: 'buyer',
  nicOrBrn: 'OTH/IT/IT_UGC_001/B005-B/0009',
  phone: '+94 77 000 1122',
  district: 'Colombo',
  bankAccount: {
    bankName: 'Commercial Bank of Ceylon',
    accountNumber: '8001928374',
    branchName: 'Head Office Branch',
  },
  verified: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('buyer');
  const [lang, setLang] = useState<Language>('en');
  const [listings, setListings] = useState<ProduceListing[]>(initialListings);
  const [offers, setOffers] = useState<NegotiationOffer[]>(initialOffers);
  const [contracts, setContracts] = useState<EscrowContract[]>(initialContracts);
  const [shipments, setShipments] = useState<ShipmentJob[]>(initialShipments);
  const [marketPrices, setMarketPrices] = useState<MarketPriceIndicator[]>(initialMarketPrices);
  const [disputes, setDisputes] = useState<DisputeTicket[]>(initialDisputes);
  const [currentUser] = useState<UserProfile>(initialUser);

  // Persistence in LocalStorage
  useEffect(() => {
    try {
      const savedListings = localStorage.getItem('kp_listings');
      if (savedListings) setListings(JSON.parse(savedListings));
      const savedOffers = localStorage.getItem('kp_offers');
      if (savedOffers) setOffers(JSON.parse(savedOffers));
      const savedContracts = localStorage.getItem('kp_contracts');
      if (savedContracts) setContracts(JSON.parse(savedContracts));
      const savedShipments = localStorage.getItem('kp_shipments');
      if (savedShipments) setShipments(JSON.parse(savedShipments));
    } catch {
      // Fallback to initial state
    }
  }, []);

  const saveState = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // localstorage error ignore
    }
  };

  const addListing = (listingData: Omit<ProduceListing, 'id' | 'status' | 'farmerId' | 'totalValueLkr'>) => {
    const newId = `list-${Date.now()}`;
    const totalVal = listingData.quantityKg * listingData.pricePerKg;
    const newListing: ProduceListing = {
      ...listingData,
      id: newId,
      farmerId: 'farmer-curr',
      totalValueLkr: totalVal,
      status: 'active',
    };
    const updated = [newListing, ...listings];
    setListings(updated);
    saveState('kp_listings', updated);
  };

  const createOffer = (listingId: string, targetQtyKg: number, offeredPricePerKg: number, deliveryDate: string, note: string) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    const offerId = `off-${Date.now()}`;
    const newOffer: NegotiationOffer = {
      id: offerId,
      listingId,
      produceTitle: listing.title,
      cropType: listing.cropType,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerCompany: 'Lanka Agri Procurement Ltd',
      buyerPhone: currentUser.phone,
      farmerId: listing.farmerId,
      farmerName: listing.farmerName,
      targetQtyKg,
      originalPricePerKg: listing.pricePerKg,
      offeredPricePerKg,
      proposedDeliveryDate: deliveryDate,
      status: 'pending',
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: 'buyer',
          senderName: currentUser.name,
          offeredPricePerKg,
          quantityKg: targetQtyKg,
          note: note || `Requested ${targetQtyKg}kg at LKR ${offeredPricePerKg}/kg`,
          timestamp: new Date().toLocaleString(),
        },
      ],
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    const updatedOffers = [newOffer, ...offers];
    setOffers(updatedOffers);
    saveState('kp_offers', updatedOffers);

    // Update listing status
    const updatedListings = listings.map((l) => (l.id === listingId ? { ...l, status: 'negotiating' as const } : l));
    setListings(updatedListings);
    saveState('kp_listings', updatedListings);
  };

  const respondToOffer = (
    offerId: string,
    action: 'accept' | 'reject' | 'counter',
    counterPrice?: number,
    counterQty?: number,
    note?: string
  ) => {
    const updatedOffers = offers.map((off) => {
      if (off.id !== offerId) return off;

      let newStatus: NegotiationOffer['status'] = off.status;
      const newMessages = [...off.messages];
      const isFarmer = role === 'farmer';

      if (action === 'accept') {
        newStatus = 'accepted';
        newMessages.push({
          id: `m-${Date.now()}`,
          sender: isFarmer ? 'farmer' : 'buyer',
          senderName: isFarmer ? off.farmerName : off.buyerName,
          offeredPricePerKg: off.offeredPricePerKg,
          quantityKg: off.targetQtyKg,
          note: note || 'Offer Accepted! Proceeding to generate Escrow B2B Contract.',
          timestamp: new Date().toLocaleString(),
        });

        // Automatically generate contract
        const produceAmt = off.targetQtyKg * off.offeredPricePerKg;
        const escrowFee = Math.round(produceAmt * 0.015);
        const transportFee = 14500;
        const newContract: EscrowContract = {
          id: `ctr-${Date.now()}`,
          negotiationId: offerId,
          listingId: off.listingId,
          buyerName: off.buyerName,
          buyerCompany: off.buyerCompany,
          farmerName: off.farmerName,
          produceTitle: `${off.produceTitle} (${off.targetQtyKg} Kg)`,
          quantityKg: off.targetQtyKg,
          agreedPricePerKg: off.offeredPricePerKg,
          produceAmountLkr: produceAmt,
          escrowFeeLkr: escrowFee,
          transportFeeLkr: transportFee,
          totalPaidLkr: produceAmt + escrowFee + transportFee,
          status: 'holding',
          invoiceNumber: `INV-KP-${Math.floor(100000 + Math.random() * 900000)}`,
          paymentMethod: 'Escrow Bank Holding',
          depositDate: new Date().toLocaleString(),
          qrVerificationCode: `KP-QR-${Math.floor(1000 + Math.random() * 9000)}-${off.cropType.toUpperCase()}`,
          deliveryAddress: 'Colombo Wholesale Hub, Pettah Distribution Center',
          haulerStatus: 'pending',
        };

        setContracts((prev) => {
          const next = [newContract, ...prev];
          saveState('kp_contracts', next);
          return next;
        });

      } else if (action === 'reject') {
        newStatus = 'rejected';
        newMessages.push({
          id: `m-${Date.now()}`,
          sender: isFarmer ? 'farmer' : 'buyer',
          senderName: isFarmer ? off.farmerName : off.buyerName,
          offeredPricePerKg: off.offeredPricePerKg,
          quantityKg: off.targetQtyKg,
          note: note || 'Offer declined.',
          timestamp: new Date().toLocaleString(),
        });
      } else if (action === 'counter' && counterPrice) {
        newStatus = 'countered';
        newMessages.push({
          id: `m-${Date.now()}`,
          sender: isFarmer ? 'farmer' : 'buyer',
          senderName: isFarmer ? off.farmerName : off.buyerName,
          offeredPricePerKg: counterPrice,
          quantityKg: counterQty || off.targetQtyKg,
          note: note || `Counter-offer: LKR ${counterPrice}/kg for ${counterQty || off.targetQtyKg}kg`,
          timestamp: new Date().toLocaleString(),
        });
      }

      return {
        ...off,
        status: newStatus,
        offeredPricePerKg: counterPrice || off.offeredPricePerKg,
        targetQtyKg: counterQty || off.targetQtyKg,
        messages: newMessages,
        updatedAt: new Date().toLocaleString(),
      };
    });

    setOffers(updatedOffers);
    saveState('kp_offers', updatedOffers);
  };

  const depositEscrow = (contractId: string) => {
    const updatedContracts = contracts.map((c) => (c.id === contractId ? { ...c, status: 'holding' as const } : c));
    setContracts(updatedContracts);
    saveState('kp_contracts', updatedContracts);
  };

  const updateShipmentStatus = (shipmentId: string, status: ShipmentJob['status'], locationName?: string) => {
    const updatedShipments = shipments.map((s) => {
      if (s.id !== shipmentId) return s;
      return {
        ...s,
        status,
        currentLocationName: locationName || s.currentLocationName,
      };
    });
    setShipments(updatedShipments);
    saveState('kp_shipments', updatedShipments);
  };

  const verifyDeliveryQr = (shipmentId: string) => {
    const updatedShipments = shipments.map((s) => {
      if (s.id !== shipmentId) return s;
      return {
        ...s,
        status: 'delivered' as const,
        qrSignatureVerified: true,
        verifiedAt: new Date().toLocaleString(),
      };
    });
    setShipments(updatedShipments);
    saveState('kp_shipments', updatedShipments);

    // Also update contract status to released
    const shipment = shipments.find((s) => s.id === shipmentId);
    if (shipment) {
      const updatedContracts = contracts.map((c) => (c.id === shipment.contractId ? { ...c, status: 'released' as const, haulerStatus: 'delivered' as const } : c));
      setContracts(updatedContracts);
      saveState('kp_contracts', updatedContracts);
    }
  };

  const updateMarketPrice = (id: string, avgPriceLkr: number) => {
    const updated = marketPrices.map((mp) => {
      if (mp.id !== id) return mp;
      const min = Math.round(avgPriceLkr * 0.9);
      const max = Math.round(avgPriceLkr * 1.1);
      return { ...mp, avgPriceLkr, minPriceLkr: min, maxPriceLkr: max, updatedAt: 'Just updated' };
    });
    setMarketPrices(updated);
  };

  const raiseDispute = (contractId: string, reason: string, evidence: string) => {
    const newDispute: DisputeTicket = {
      id: `disp-${Date.now()}`,
      contractId,
      raisedBy: currentUser.name,
      role: role === 'buyer' ? 'buyer' : 'farmer',
      reason,
      evidenceNotes: evidence,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDisputes([newDispute, ...disputes]);
  };

  const resolveDispute = (disputeId: string, outcome: string, refundPct: number) => {
    const updatedDisputes = disputes.map((d) =>
      d.id === disputeId ? { ...d, status: 'resolved' as const, resolutionOutcome: outcome, refundPercentage: refundPct } : d
    );
    setDisputes(updatedDisputes);

    const dispute = disputes.find((d) => d.id === disputeId);
    if (dispute) {
      const updatedContracts = contracts.map((c) =>
        c.id === dispute.contractId ? { ...c, status: refundPct > 0 ? ('refunded' as const) : ('released' as const) } : c
      );
      setContracts(updatedContracts);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        lang,
        setLang,
        listings,
        addListing,
        offers,
        createOffer,
        respondToOffer,
        contracts,
        depositEscrow,
        shipments,
        updateShipmentStatus,
        verifyDeliveryQr,
        marketPrices,
        updateMarketPrice,
        disputes,
        raiseDispute,
        resolveDispute,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

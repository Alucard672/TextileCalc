/**
 * Textile Engineering Calculation Functions
 * All functions are pure functions for easy testing
 */

// ==================== Yarn Count Converter ====================

/**
 * Convert Ne (English Count) to Nm (Metric Count)
 * Formula: Nm = Ne * 1.693
 */
export function convertNeToNm(ne: number): number {
  if (ne <= 0) return 0;
  return ne * 1.693;
}

/**
 * Convert Ne (English Count) to Tex
 * Formula: Tex = 590.5 / Ne
 */
export function convertNeToTex(ne: number): number {
  if (ne <= 0) return 0;
  return 590.5 / ne;
}

/**
 * Convert Ne (English Count) to Denier
 * Formula: Denier = 5315 / Ne
 */
export function convertNeToDenier(ne: number): number {
  if (ne <= 0) return 0;
  return 5315 / ne;
}

/**
 * Convert Nm (Metric Count) to Ne (English Count)
 * Formula: Ne = Nm / 1.693
 */
export function convertNmToNe(nm: number): number {
  if (nm <= 0) return 0;
  return nm / 1.693;
}

/**
 * Convert Tex to Ne (English Count)
 * Formula: Ne = 590.5 / Tex
 */
export function convertTexToNe(tex: number): number {
  if (tex <= 0) return 0;
  return 590.5 / tex;
}

/**
 * Convert Denier to Ne (English Count)
 * Formula: Ne = 5315 / Denier
 */
export function convertDenierToNe(denier: number): number {
  if (denier <= 0) return 0;
  return 5315 / denier;
}

/**
 * Convert Nm to Tex
 * Formula: Tex = 1000 / Nm
 */
export function convertNmToTex(nm: number): number {
  if (nm <= 0) return 0;
  return 1000 / nm;
}

/**
 * Convert Tex to Nm
 * Formula: Nm = 1000 / Tex
 */
export function convertTexToNm(tex: number): number {
  if (tex <= 0) return 0;
  return 1000 / tex;
}

/**
 * Convert Nm to Denier
 * Formula: Denier = 9000 / Nm
 */
export function convertNmToDenier(nm: number): number {
  if (nm <= 0) return 0;
  return 9000 / nm;
}

/**
 * Convert Denier to Nm
 * Formula: Nm = 9000 / Denier
 */
export function convertDenierToNm(denier: number): number {
  if (denier <= 0) return 0;
  return 9000 / denier;
}

/**
 * Convert Tex to Denier
 * Formula: Denier = Tex * 9
 */
export function convertTexToDenier(tex: number): number {
  if (tex <= 0) return 0;
  return tex * 9;
}

/**
 * Convert Denier to Tex
 * Formula: Tex = Denier / 9
 */
export function convertDenierToTex(denier: number): number {
  if (denier <= 0) return 0;
  return denier / 9;
}

/**
 * Universal yarn count converter
 * @param value - The value to convert
 * @param from - Source unit: 'ne' | 'nm' | 'tex' | 'denier'
 * @param to - Target unit: 'ne' | 'nm' | 'tex' | 'denier'
 */
export function convertYarnCount(
  value: number,
  from: 'ne' | 'nm' | 'tex' | 'denier',
  to: 'ne' | 'nm' | 'tex' | 'denier'
): number {
  if (value <= 0) return 0;
  if (from === to) return value;

  // Convert to Ne first, then to target
  let ne: number;
  switch (from) {
    case 'ne':
      ne = value;
      break;
    case 'nm':
      ne = convertNmToNe(value);
      break;
    case 'tex':
      ne = convertTexToNe(value);
      break;
    case 'denier':
      ne = convertDenierToNe(value);
      break;
  }

  // Convert from Ne to target
  switch (to) {
    case 'ne':
      return ne;
    case 'nm':
      return convertNeToNm(ne);
    case 'tex':
      return convertNeToTex(ne);
    case 'denier':
      return convertNeToDenier(ne);
  }
}

// ==================== Resultant Count ====================

/**
 * Calculate resultant count for ply yarns
 * Formula: 1/Resultant = Sum(1/Count_i) for each ply
 * @param counts - Array of yarn counts (e.g., [32, 32] for 32s/2)
 * @param plies - Array of number of plies for each yarn (e.g., [1, 1] for 32s/2)
 */
export function calculateResultantCount(
  counts: number[],
  plies: number[]
): number {
  if (counts.length === 0 || counts.length !== plies.length) return 0;
  if (counts.some((c) => c <= 0) || plies.some((p) => p <= 0)) return 0;

  let sum = 0;
  for (let i = 0; i < counts.length; i++) {
    sum += plies[i] / counts[i];
  }

  if (sum === 0) return 0;
  return 1 / sum;
}

// ==================== GSM Calculator ====================

/**
 * Calculate GSM (Grams per Square Meter) from yarn count and density
 * Simplified formula: GSM ≈ (EPI/WarpCount + PPI/WeftCount) * 23.25
 * More accurate: GSM = (EPI/WarpCount + PPI/WeftCount) * Constant
 * @param warpCount - Warp yarn count in Ne
 * @param weftCount - Weft yarn count in Ne
 * @param epi - Ends per inch (warp density)
 * @param ppi - Picks per inch (weft density)
 */
export function calculateGSM(
  warpCount: number,
  weftCount: number,
  epi: number,
  ppi: number
): number {
  if (warpCount <= 0 || weftCount <= 0 || epi <= 0 || ppi <= 0) return 0;

  // Convert Ne to Tex for calculation
  const warpTex = convertNeToTex(warpCount);
  const weftTex = convertNeToTex(weftCount);

  // Convert inches to meters
  const epm = epi * 39.37; // ends per meter
  const ppm = ppi * 39.37; // picks per meter

  // Calculate GSM: (warp contribution + weft contribution)
  const warpGSM = (epm * warpTex) / 1000;
  const weftGSM = (ppm * weftTex) / 1000;

  return warpGSM + weftGSM;
}

/**
 * Convert GSM to Oz/yd²
 * Formula: Oz/yd² = GSM / 33.906
 */
export function convertGSMToOzYd2(gsm: number): number {
  if (gsm <= 0) return 0;
  return gsm / 33.906;
}

/**
 * Convert Oz/yd² to GSM
 * Formula: GSM = Oz/yd² * 33.906
 */
export function convertOzYd2ToGSM(ozYd2: number): number {
  if (ozYd2 <= 0) return 0;
  return ozYd2 * 33.906;
}

// ==================== Fabric Consumption ====================

/**
 * Calculate fabric consumption per piece
 * Simplified formula for basic garment
 * @param length - Garment length in cm
 * @param chest - Chest width in cm
 * @param sleeve - Sleeve length in cm (optional, can be 0)
 * @param gsm - Fabric GSM (grams per square meter)
 * @param wastage - Wastage percentage (e.g., 10 for 10%)
 */
export function calculateFabricConsumption(
  length: number,
  chest: number,
  sleeve: number,
  gsm: number,
  wastage: number
): number {
  if (length <= 0 || chest <= 0 || gsm <= 0 || wastage < 0) return 0;

  // Calculate fabric area in square meters
  // Basic formula: (Length + Sleeve) * (Chest * 2) / 10000 (cm² to m²)
  const fabricArea = ((length + sleeve) * chest * 2) / 10000;

  // Calculate weight in kg
  const weightKg = (fabricArea * gsm) / 1000;

  // Add wastage
  const totalWeight = weightKg * (1 + wastage / 100);

  return totalWeight;
}

/**
 * Calculate kg per dozen
 * @param consumptionPerPiece - Consumption per piece in kg
 * @param piecesPerDoz - Number of pieces per dozen (default: 12)
 */
export function calculateKgPerDoz(
  consumptionPerPiece: number,
  piecesPerDoz: number = 12
): number {
  if (consumptionPerPiece <= 0 || piecesPerDoz <= 0) return 0;
  return consumptionPerPiece * piecesPerDoz;
}

// ==================== CBM Calculator ====================

/**
 * Calculate CBM (Cubic Meters) for shipping
 * @param length - Length in cm
 * @param width - Width in cm
 * @param height - Height in cm
 * @param quantity - Number of boxes
 */
export function calculateCBM(
  length: number,
  width: number,
  height: number,
  quantity: number
): number {
  if (length <= 0 || width <= 0 || height <= 0 || quantity <= 0) return 0;

  // Convert cm to meters and calculate volume
  const volumePerBox = (length * width * height) / 1000000; // cm³ to m³
  return volumePerBox * quantity;
}

/**
 * Suggest container type based on CBM
 * @param cbm - Total CBM
 * @returns Container type suggestion
 */
export function suggestContainer(cbm: number): string {
  if (cbm <= 0) return '';

  // Standard container capacities (approximate)
  // 20ft container: ~33 CBM
  // 40ft container: ~67 CBM
  // 40ft HQ (High Cube): ~76 CBM

  if (cbm <= 33) {
    return '20ft Container';
  } else if (cbm <= 67) {
    return '40ft Container';
  } else if (cbm <= 76) {
    return '40ft HQ Container';
  } else {
    return 'Multiple Containers Required';
  }
}

// ==================== Twist Calculator ====================

/**
 * Convert TPI (Turns per Inch) to TPM (Turns per Meter)
 * Formula: TPM = TPI * 39.37
 */
export function convertTPIToTPM(tpi: number): number {
  if (tpi <= 0) return 0;
  return tpi * 39.37;
}

/**
 * Convert TPM (Turns per Meter) to TPI (Turns per Inch)
 * Formula: TPI = TPM / 39.37
 */
export function convertTPMToTPI(tpm: number): number {
  if (tpm <= 0) return 0;
  return tpm / 39.37;
}

/**
 * Calculate twist multiplier (twist factor)
 * Formula: Twist Multiplier = TPI / sqrt(Ne)
 * @param tpi - Turns per inch
 * @param ne - English count
 */
export function calculateTwistMultiplier(tpi: number, ne: number): number {
  if (tpi <= 0 || ne <= 0) return 0;
  return tpi / Math.sqrt(ne);
}

// ==================== Draft Calculator ====================

/**
 * Calculate draft ratio in spinning
 * Formula: Draft = Input Speed / Output Speed
 * @param inputSpeed - Input speed (rpm or m/min)
 * @param outputSpeed - Output speed (rpm or m/min)
 */
export function calculateDraft(inputSpeed: number, outputSpeed: number): number {
  if (outputSpeed <= 0) return 0;
  return inputSpeed / outputSpeed;
}

/**
 * Calculate draft based on roller diameters
 * Formula: Draft = Front Roller Diameter / Back Roller Diameter
 * @param frontDiameter - Front roller diameter (mm)
 * @param backDiameter - Back roller diameter (mm)
 */
export function calculateDraftByDiameter(
  frontDiameter: number,
  backDiameter: number
): number {
  if (backDiameter <= 0) return 0;
  return frontDiameter / backDiameter;
}

// ==================== Cover Factor ====================

/**
 * Calculate cover factor using Pierce formula
 * Formula: Cover Factor = (EPI / sqrt(Ne_warp) + PPI / sqrt(Ne_weft)) / 28
 * @param epi - Ends per inch (warp density)
 * @param ppi - Picks per inch (weft density)
 * @param warpCount - Warp yarn count in Ne
 * @param weftCount - Weft yarn count in Ne
 */
export function calculateCoverFactor(
  epi: number,
  ppi: number,
  warpCount: number,
  weftCount: number
): number {
  if (epi <= 0 || ppi <= 0 || warpCount <= 0 || weftCount <= 0) return 0;
  return (epi / Math.sqrt(warpCount) + ppi / Math.sqrt(weftCount)) / 28;
}

// ==================== Weave Beam Weight ====================

/**
 * Calculate weave beam weight
 * Formula: Weight = (Length × Ends × Yarn Count Factor) / 1000
 * Simplified: Weight (kg) = (Length in meters × Ends × Tex) / 1000
 * @param length - Beam length in meters
 * @param ends - Number of ends (warp threads)
 * @param yarnCountTex - Yarn count in Tex
 */
export function calculateWeaveBeamWeight(
  length: number,
  ends: number,
  yarnCountTex: number
): number {
  if (length <= 0 || ends <= 0 || yarnCountTex <= 0) return 0;
  return (length * ends * yarnCountTex) / 1000;
}

// ==================== Fabric Production ====================

/**
 * Calculate fabric production per hour
 * Formula: Production (m/h) = (RPM × Efficiency × 60) / PPI
 * @param rpm - Loom speed in revolutions per minute
 * @param ppi - Picks per inch
 * @param efficiency - Efficiency percentage (e.g., 85 for 85%)
 */
export function calculateFabricProduction(
  rpm: number,
  ppi: number,
  efficiency: number
): number {
  if (rpm <= 0 || ppi <= 0 || efficiency <= 0) return 0;
  // Convert inches to meters: 1 inch = 0.0254 meters
  const productionPerMinute = (rpm * efficiency) / 100 / ppi;
  const productionPerHour = productionPerMinute * 60 * 0.0254; // Convert to meters
  return productionPerHour;
}

/**
 * Calculate daily production
 * @param hourlyProduction - Production per hour in meters
 * @param workingHours - Working hours per day
 */
export function calculateDailyProduction(
  hourlyProduction: number,
  workingHours: number
): number {
  if (hourlyProduction <= 0 || workingHours <= 0) return 0;
  return hourlyProduction * workingHours;
}

// ==================== Cost Estimator ====================

/**
 * Calculate total cost for textile production
 * @param yarnPrice - Yarn price per kg
 * @param yarnConsumption - Yarn consumption per unit (kg)
 * @param laborCost - Labor cost per unit
 * @param overhead - Overhead cost per unit
 * @param profitMargin - Profit margin percentage (e.g., 20 for 20%)
 */
export function calculateTotalCost(
  yarnPrice: number,
  yarnConsumption: number,
  laborCost: number,
  overhead: number,
  profitMargin: number
): number {
  if (yarnPrice < 0 || yarnConsumption < 0 || laborCost < 0 || overhead < 0 || profitMargin < 0)
    return 0;

  const materialCost = yarnPrice * yarnConsumption;
  const totalCost = materialCost + laborCost + overhead;
  const profit = (totalCost * profitMargin) / 100;
  return totalCost + profit;
}

// ==================== Unit Converter ====================

/**
 * Convert yards to meters
 * Formula: Meters = Yards × 0.9144
 */
export function convertYardsToMeters(yards: number): number {
  if (yards < 0) return 0;
  return yards * 0.9144;
}

// ==================== Fabric Shrinkage Calculator ====================

/**
 * Calculate fabric shrinkage percentage
 * @param originalLength - Original length before washing (cm or inches)
 * @param afterWashLength - Length after washing (cm or inches)
 */
export function calculateShrinkage(
  originalLength: number,
  afterWashLength: number
): number {
  if (originalLength <= 0) return 0;
  if (afterWashLength < 0) return 0;
  
  // Shrinkage % = ((Original - After) / Original) × 100
  const shrinkage = ((originalLength - afterWashLength) / originalLength) * 100;
  return Math.max(0, shrinkage); // Ensure non-negative
}

// ==================== Fabric GSM to Oz Converter ====================
// Note: convertGSMToOzYd2 and convertOzYd2ToGSM are already defined above (lines 220-234)
// No need to redefine them here

// ==================== Yarn Weight Calculator ====================

/**
 * Calculate yarn weight from length and count
 * @param length - Yarn length in meters
 * @param yarnCountNe - Yarn count in Ne (English Count)
 * @returns Weight in kilograms
 */
export function calculateYarnWeight(length: number, yarnCountNe: number): number {
  if (length <= 0 || yarnCountNe <= 0) return 0;
  
  // Convert Ne to Tex: Tex = 590.5 / Ne
  const tex = 590.5 / yarnCountNe;
  
  // Weight (kg) = (Length × Tex) / 1000
  return (length * tex) / 1000;
}

/**
 * Calculate yarn weight from length and Tex
 * @param length - Yarn length in meters
 * @param yarnCountTex - Yarn count in Tex
 * @returns Weight in kilograms
 */
export function calculateYarnWeightFromTex(length: number, yarnCountTex: number): number {
  if (length <= 0 || yarnCountTex <= 0) return 0;
  
  // Weight (kg) = (Length × Tex) / 1000
  return (length * yarnCountTex) / 1000;
}

// ==================== Fabric Yardage Calculator ====================

/**
 * Calculate fabric yardage from meters and width
 * @param meters - Fabric length in meters
 * @param widthCm - Fabric width in centimeters
 * @returns Yardage in square yards
 */
export function calculateFabricYardage(meters: number, widthCm: number): number {
  if (meters <= 0 || widthCm <= 0) return 0;
  
  // Convert meters to yards: 1 meter = 1.09361 yards
  const yards = meters * 1.09361;
  
  // Convert width from cm to yards: 1 cm = 0.0109361 yards
  const widthYards = widthCm * 0.0109361;
  
  // Square yards = length (yards) × width (yards)
  return yards * widthYards;
}

/**
 * Calculate fabric yardage from yards and width
 * @param yards - Fabric length in yards
 * @param widthInches - Fabric width in inches
 * @returns Yardage in square yards
 */
export function calculateFabricYardageFromYards(yards: number, widthInches: number): number {
  if (yards <= 0 || widthInches <= 0) return 0;
  
  // Convert width from inches to yards: 1 inch = 0.0277778 yards
  const widthYards = widthInches * 0.0277778;
  
  // Square yards = length (yards) × width (yards)
  return yards * widthYards;
}

/**
 * Convert meters to yards
 * Formula: Yards = Meters / 0.9144
 */
export function convertMetersToYards(meters: number): number {
  if (meters < 0) return 0;
  return meters / 0.9144;
}

/**
 * Convert pounds to kilograms
 * Formula: Kilograms = Pounds × 0.453592
 */
export function convertPoundsToKilograms(pounds: number): number {
  if (pounds < 0) return 0;
  return pounds * 0.453592;
}

/**
 * Convert kilograms to pounds
 * Formula: Pounds = Kilograms / 0.453592
 */
export function convertKilogramsToPounds(kilograms: number): number {
  if (kilograms < 0) return 0;
  return kilograms / 0.453592;
}

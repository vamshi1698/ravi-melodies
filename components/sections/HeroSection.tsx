'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Phone, Play } from 'lucide-react';

function StageLight({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <spotLight
      position={position}
      color={color}
      intensity={50}
      angle={0.4}
      penumbra={0.5}
      castShadow
    />
  );
}

function FloatingNote({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + delay) * 0.3;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime + delay) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.15, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function SoundWave({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.2;
          child.scale.set(scale, scale, scale);
          const mat = child.material as THREE.MeshBasicMaterial;
          mat.opacity = 0.3 - (i * 0.05);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[2 + i * 0.5, 2.1 + i * 0.5, 64]} />
          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const isGold = Math.random() > 0.3;
      colors[i * 3] = isGold ? 0.83 : 0.29;
      colors[i * 3 + 1] = isGold ? 0.69 : 0.1;
      colors[i * 3 + 2] = isGold ? 0.22 : 0.48;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Stage() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
        <ringGeometry args={[7.8, 8, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.5}
        />
      </mesh>

      {[-6, -3, 0, 3, 6].map((x, i) => (
        <mesh key={i} position={[x, -0.48, i < 2 || i > 2 ? -4 : 0]}>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    camera.position.y = 4 + Math.cos(state.clock.elapsedTime * 0.15) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <StageLight position={[-6, 10, -5]} color="#d4af37" />
      <StageLight position={[6, 10, -5]} color="#d4af37" />
      <StageLight position={[0, 12, -8]} color="#4a1a7a" />
      <StageLight position={[-4, 8, 5]} color="#d4af37" />
      <StageLight position={[4, 8, 5]} color="#d4af37" />

      <Stage />
      <SoundWave position={[0, -0.3, 0]} />

      <FloatingNote position={[-3, 2, -2]} delay={0} />
      <FloatingNote position={[3, 3, -3]} delay={1} />
      <FloatingNote position={[-2, 1.5, -4]} delay={2} />
      <FloatingNote position={[4, 2.5, -1]} delay={3} />
      <FloatingNote position={[0, 4, -5]} delay={4} />

      <ParticleField />
      <Sparkles count={100} scale={20} size={2} speed={0.5} color="#d4af37" />
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
    </>
  );
}

export default function HeroSection() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello Ravi Melodies, I would like to book your orchestra for an event.');
    window.open(`https://wa.me/919347456157?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919347456157';
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 4, 12], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={['#0a0a0a']} />
          <fog attach="fog" args={['#0a0a0a', 10, 50]} />
          <Scene />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matte-black/30 to-matte-black z-10 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gold/80 uppercase tracking-[0.3em] text-sm mb-4"
          >
            Events & Orchestra
          </motion.p>

          <h1 className="relative">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="block text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight"
            >
              <span className="text-white">RAVI</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="block text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient-gold mt-2"
            >
              MELODIES
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-white/70 text-lg md:text-xl mt-6 mb-10 font-light"
          >
            &quot;Creating Unforgettable Musical Moments&quot;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleWhatsApp}
              className="group px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-matte-black font-semibold rounded-full flex items-center justify-center gap-3 hover:shadow-gold transition-all duration-500 magnetic-button"
            >
              <span>Book on WhatsApp</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.65-.236-.375a9.86 9.86 0 01-1.517-5.26c.001-5.423 4.422-9.84 9.852-9.84 2.619 0 5.079 1.023 6.929 2.882a9.83 9.83 0 012.714 6.936c-.003 5.423-4.424 9.84-9.852 9.84m8.367-18.206C18.042 1.328 15.562 0 12.907 0 6.448 0 1.006 5.446 1.003 11.91c-.001 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.88 11.88 0 005.683 1.448h.005c6.455 0 11.895-5.447 11.9-11.886.002-3.181-1.234-6.173-3.49-8.42z"/>
              </svg>
            </button>

            <button
              onClick={handleCall}
              className="group px-8 py-4 border-2 border-gold/50 text-gold font-semibold rounded-full flex items-center justify-center gap-3 hover:bg-gold/10 hover:border-gold transition-all duration-500 magnetic-button"
            >
              <Phone size={20} />
              <span>Call Now</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-pointer group"
          onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs uppercase tracking-widest">Watch Performances</span>
          <Play size={24} className="group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-gold rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
